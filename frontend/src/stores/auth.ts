import type { BaseRecord } from "@/pocketbase";
import client from "@/pocketbase";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CustomError } from "./errors";

export interface User extends BaseRecord {
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

export interface UpdateUserDto extends CreateUserDto {
  oldPassword: string;
}

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = computed(() => !!user.value);
  const user = ref(client.authStore.model as User | null);

  client.authStore.onChange((_, model) => {
    user.value = model as typeof user.value;
  });

  if (user.value) client.collection("users").authRefresh();

  const login = async (usernameOrEmail: string, password: string) => {
    await client
      .collection("users")
      .authWithPassword(usernameOrEmail, password);
  };

  const logout = () => {
    client.authStore.clear();
  };

  const sendEmailVerification = async () => {
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

    const record = await client
      .collection("users")
      .update<User>(user.value.id, dto);
    if (record.email) {
      await client.collection("users").requestVerification(record.email);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    user,
    sendEmailVerification,
    createUser,
    updateUser,
  };
});
