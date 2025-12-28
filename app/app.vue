<template>
  <OnyxAppLayout class="onyx-grid-max-md onyx-grid-center">
    <template #navBar>
      <NavBar />
    </template>

    <NuxtLayout>
      <NuxtRouteAnnouncer />

      <slot>
        <NuxtPage />
      </slot>
    </NuxtLayout>
  </OnyxAppLayout>
</template>
