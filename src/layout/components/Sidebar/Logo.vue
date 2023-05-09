<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Admin',
      logo: 'data:image/png;base64,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'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #005994;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 20px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 22px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
