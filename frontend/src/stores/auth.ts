import { config } from "@/config";
import type { BaseRecord } from "@/pocketbase";
import client from "@/pocketbase";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CustomError } from "./errors";

export interface User extends BaseRecord, UserSettingsDto {
  email: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  oldPassword?: string;
  /** Set to null to remove current avatar. */
  avatar?: File | null;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface UserSettingsDto {
  theme: "light" | "dark" | "";
  locale: string;
}

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = computed(() => !!user.value);
  const user = ref(client.authStore.model as User | null);
  const isTestUser = computed(
    () => user.value?.email === config.api.testUser.email
  );

  client.authStore.onChange((_, model) => {
    user.value = model as typeof user.value;
  });

  const login = async ({ usernameOrEmail, password }: LoginPayload) => {
    await client
      .collection("users")
      .authWithPassword(usernameOrEmail, password);
  };

  const logout = () => {
    client.authStore.clear();
  };

  const refreshAuth = async () => {
    if (!user.value) return;
    await client.collection("users").authRefresh();
  };

  const requestEmailVerification = async () => {
    if (!user.value) return;
    return await client
      .collection("users")
      .requestVerification(user.value?.email);
  };

  const createUser = async (dto: CreateUserDto) => {
    const record = await client
      .collection("users")
      .create<User>({ ...dto, emailVisibility: true });
    if (record.email) {
      await client.collection("users").requestVerification(record.email);
    }
  };

  const updateUser = async (dto: UpdateUserDto) => {
    if (!user.value?.id) {
      throw new CustomError(
        "Unable to update user because you are not logged in"
      );
    }

    const formData = new FormData();
    Object.entries(dto).forEach(([key, value]) => {
      if (key === "email") return;
      formData.set(key, value);
    });

    const record = await client
      .collection("users")
      .update<User>(user.value.id, formData);
    if (dto.email && record.email !== dto.email) {
      await client.collection("users").requestEmailChange(dto.email);
    }
  };

  const updateSettings = async (dto: Partial<UserSettingsDto>) => {
    if (!user.value?.id) {
      throw new CustomError(
        "Unable to update user because you are not logged in"
      );
    }
    await client.collection("users").update<User>(user.value.id, dto);
  };

  const deleteUser = async () => {
    if (!user.value) return;
    client.collection("users").delete(user.value.id);
  };

  return {
    isAuthenticated,
    login,
    logout,
    user,
    requestEmailVerification,
    createUser,
    updateUser,
    updateSettings,
    deleteUser,
    isTestUser,
    refreshAuth,
  };
});
