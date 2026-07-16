<template>
  <PageWrapper :class="prefixCls" title="图书列表">
    <template #headerContent>
      <BasicForm
        :class="`${prefixCls}__header-form`"
        :labelWidth="100"
        :schemas="schemas"
        showActionButtonGroup
        @submit="handleQuery"
      />
    </template>

    <div :class="`${prefixCls}__container`">
      <a-list>
        <template v-for="item in list" :key="item.id">
          <a-list-item>
            <template #extra>
              <a :href="wrapperCoverImage(item.cover)" target="_blank">
                <img
                  :class="`${prefixCls}__cover`"
                  alt="logo"
                  :src="wrapperCoverImage(item.cover)"
                />
              </a>
            </template>
            <a-list-item-meta>
              <template #description>
                <div :class="`${prefixCls}__content`">
                  {{ item.content }}
                </div>
                <div :class="`${prefixCls}__action`">
                  <!-- <template v-for="action in actions" :key="action.icon">
                    <div :class="`${prefixCls}__action-item`">
                      <Icon
                        v-if="action.icon"
                        :class="`${prefixCls}__action-icon`"
                        :icon="action.icon"
                        :color="action.color"
                      />
                      {{ action.text }}
                    </div>
                  </template> -->
                  <span :class="`${prefixCls}__time`">{{ item.time }}</span>
                </div>
              </template>
              <template #title>
                <p :class="`${prefixCls}__title`">
                  {{ item.title }}
                </p>
                <div>
                  <template v-for="tag in item.description" :key="tag">
                    <Tag class="mb-2">
                      {{ tag }}
                    </Tag>
                  </template>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <a-pagination
        :total="total"
        :show-total="() => `共 ${total} 条数据`"
        :page-size="pageSize"
        v-model:current="current"
        @change="onPageChange"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { Tag, List, Pagination } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { BasicForm } from '/@/components/Form/index';
  import { actions, searchList, schemas } from './data';
  import { PageWrapper } from '/@/components/Page';
  const total = ref(80);
  const current = ref(1);
  const pageSize = ref(20);
  const list = ref([]);
  const title = ref();
  const author = ref();
  const onPageChange = (page: number, pagesize) => {
    current.value = page
    pageSize.value = pagesize
    const params: any = {
      title: title.value,
      author: author.value,
      page: current.value,
      pageSize: pageSize.value,
    };
    handleSearchList(params)
  };
  const handleQuery = (values: any) => {
    if (values.title) {
      title.value = values.title;
    } else {
      title.value = null;
    }
    if (values.author) {
      author.value = values.author;
    } else {
      author.value = null;
    }
    const params: any = {
      title: title.value,
      author: author.value,
      page: current.value,
      pageSize: pageSize.value,
    };
    handleSearchList(params);
  };
  const wrapperCoverImage = (cover) => {
    if (cover.startsWith('/')) {
      return `https://www.youbaobao.xyz/book/res/img${cover}`;
    } else {
      return `http://localhost:8080/upload/cover/${cover}`;
    }
  };
  const handleSearchList = (params) => {
    searchList(params).then(({ data, count }) => {
      list.value = data;
      total.value = count;
    });
  };
  export default defineComponent({
    components: {
      Icon,
      Tag,
      BasicForm,
      PageWrapper,
      [Pagination.name]: Pagination,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
    },
    mounted() {
      handleSearchList({});
    },
    setup() {
      return {
        prefixCls: 'list-search',
        list,
        actions,
        schemas,
        handleQuery,
        total,
        pageSize,
        current,
        onPageChange,
        handleSearchList,
        wrapperCoverImage,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-search {
    &__header {
      &-form {
        margin-bottom: -16px;
      }
    }

    &__cover {
      width: 120px;
      height: 140px;
    }

    &__container {
      padding: 12px;
      background-color: @component-background;
    }

    &__title {
      margin-bottom: 12px;
      font-size: 18px;
    }

    &__content {
      color: @text-color-secondary;
    }

    &__action {
      margin-top: 10px;

      &-item {
        display: inline-block;
        padding: 0 16px;
        color: @text-color-secondary;

        &:nth-child(1) {
          padding-left: 0;
        }

        &:nth-child(1),
        &:nth-child(2) {
          border-right: 1px solid @border-color-base;
        }
      }

      &-icon {
        margin-right: 3px;
      }
    }

    &__time {
      color: rgb(0 0 0 / 45%);
    }
  }
</style>
