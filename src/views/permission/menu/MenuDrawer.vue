<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuList as getManageMenuList } from '/@/api/demo/system';
  import { createMenu, updateMenu } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });
      let currentMenuId: string | number | undefined;
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        currentMenuId = data?.record?.id;

        if (unref(isUpdate)) {
          const record = data.record;
          setFieldsValue({
            ...record,
            parentMenu: record.pid == null || String(record.pid) === '0' ? undefined : record.pid,
            status: String(record.active ?? record.status ?? 1),
          });
        }
        const menuResult = await getManageMenuList();
        const treeData = Array.isArray(menuResult) ? menuResult : menuResult.items || [];
        updateSchema({
          field: 'parentMenu',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          if (values.parentMenu) {
            values.pid = values.parentMenu;
          } else {
            values.pid = 0;
          }
          values.active = +values.status;
          delete values.parentMenu;
          const isUpdateForm = unref(isUpdate);
          if (isUpdateForm) {
            values.id = currentMenuId;
            await updateMenu({ data: values });
          } else {
            await createMenu({ data: values });
          }
          createMessage.success('操作成功');
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
