<template functional>
  <vue-row
    :class="[$style.notification, data.class, data.staticClass]"
    :style="[
      {
        backgroundColor: props.notification.seen
          ? 'transparent'
          : props.notification.color.rgba(0.2),
      },
      data.style,
    ]"
    tag="article"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <vue-col
      :class="$style.notification__section"
      align-self="center"
      cols="auto"
      tag="section"
    >
      <vue-icon
        :class="$style.notification__image"
        :style="{ color: props.notification.color }"
        :size="30"
        data-testid="image"
      >
        {{ props.notification.image }}
      </vue-icon>
    </vue-col>
    <vue-col :class="$style.notification__section" tag="section">
      <h2 :class="$style.notification__title" data-testid="title">
        {{ props.notification.title }}
        <time :class="$style.notification__date" data-testid="date">
          {{ props.notification.date | date }}
        </time>
      </h2>
      <div :class="$style.notification__text" lang="ru" data-testid="text" v-html="props.notification.text" />
    </vue-col>
  </vue-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Notification } from '@/business/notifications/models'

export default Vue.extend({
  name: 'Notification',
  props: {
    notification: {
      type: Notification,
      required: true,
    } as PropOptions<Notification>,
  },
})
</script>

<style lang="scss" module>
@import '../../assets/scss/resources/_colors.scss';
@import '../../assets/scss/resources/_spacing.scss';
@import '../../assets/scss/resources/_sizes.scss';

.notification {
  margin-left: -5px;
  margin-right: -5px;
  padding: 10px 0;
  border-radius: 5px;
}

.notification__section {
  padding: 0;

  &:first-of-type {
    margin: 0 map_get($offsets, 2);
  }

  &:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.notification__title {
  margin-bottom: map_get($offsets, 1);
  font-size: map_get($font-sizes, 2);
}

.notification__text {
  font-size: 14px;
  hyphens: auto;
  overflow-wrap: anywhere;
}

.notification__date {
  margin-left: map_get($offsets, 1);
  text-align: right;
  font-size: map_get($font-sizes, 1);
  font-weight: normal;
  color: map_get($colors, dark-gray);
}
</style>
