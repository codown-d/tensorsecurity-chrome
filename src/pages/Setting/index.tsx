import TruncatedTextWithTooltip from '@/components/TruncatedTextWithTooltip';
import { trim } from '@/utils/format';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
} from 'antd';
import { useEffect } from 'react';
import './index.less';

let { Option } = Select;
let settingInfo = {
  enable: true,
  maxStudyTime: 90,
  disposeDelay: 10,
  product: [],
  basUrl: '',
};
const SettingPage: React.FC = () => {
  const access = useAccess();
  let productList = [
    {
      avatar_url: '/images/web-ico.svg',
      enable: true,
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    chrome.storage?.local.get('basUrl', (result: any) => {
      form.setFieldsValue({ basUrl: result['basUrl'] || undefined });
    });
    chrome.storage?.local.get(
      'settingInfo',
      function (result: { [x: string]: any }) {
        form.setFieldsValue(result['settingInfo'] || settingInfo);
      },
    );
  }, []);
  return (
    <PageContainer
      ghost
      header={{
        title: '设置',
        onBack: () => history.go(-1),
        style: {
          padding: 0,
          margin: 0,
        },
      }}
      childrenContentStyle={{ padding: 0 }}
    >
      <Form
        form={form}
        colon={false}
        initialValues={{ remember: true }}
        labelCol={{ flex: `calc(100% - 190px)` }}
        wrapperCol={{ flex: '190px' }}
        autoComplete="off"
        className="setting-form"
        layout={'horizontal'}
        labelAlign={'left'}
        onValuesChange={(changedValues, allValues) => {
          chrome.storage?.local.set({ settingInfo: allValues }, () => {});
        }}
      >
        <Form.Item
          label={<TruncatedTextWithTooltip content={'网页划词查询 IP 情报'} />}
          name="enable"
          valuePropName="checked"
          className="setting-form-item-between"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="最长学习时间"
          name="maxStudyTime"
          initialValue={90}
          className="setting-form-item-between"
        >
          <InputNumber addonAfter={'分钟'} style={{ width: '100px' }} />
        </Form.Item>

        <Form.Item
          label="值守自动处置延迟"
          name="disposeDelay"
          initialValue={10}
          className="setting-form-item-between"
        >
          <InputNumber addonAfter={'秒'} style={{ width: '100px' }} />
        </Form.Item>
        <Form.Item
          label="插件后端服务地址"
          name="basUrl"
          className="setting-form-item-between"
        >
          <Input
            style={{ width: '100%' }}
            placeholder={'服务地址'}
            onChange={(val) => {
              chrome.storage?.local.set(
                { basUrl: trim(val.target.value) },
                () => {},
              );
            }}
          />
        </Form.Item>
        {false && (
          <>
            <div className="mb12 mt8">产品适配</div>
            <div
              className="flex-r-c mb20"
              style={{ justifyContent: 'flex-start' }}
            >
              {productList.map((item, index) => {
                return (
                  <div className={`flex-c-c product-info act`} key={index}>
                    <img
                      src={item.avatar_url}
                      alt=""
                      style={{ width: '40px' }}
                    />
                    <Form.Item
                      noStyle
                      valuePropName="checked"
                      name={['product', index, 'enable']}
                    >
                      <Switch
                        className="mt2"
                        size={'small'}
                        defaultChecked={true}
                      />
                    </Form.Item>
                  </div>
                );
              })}
            </div>
            <div className="mb8">数据抓取网页</div>
            <Form.List name="product">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Form.Item
                      required={false}
                      key={key}
                      className="mb8"
                      wrapperCol={{ flex: 1 }}
                    >
                      <Form.Item
                        {...restField}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: '请输入数据抓取网页地址',
                          },
                        ]}
                        noStyle
                        name={[name, 'pageUrl']}
                      >
                        <Input
                          addonBefore={
                            <Form.Item
                              name={[name, 'protocol']}
                              noStyle
                              initialValue={'http'}
                            >
                              <Select style={{ width: 90 }}>
                                <Option value="http">http</Option>
                                <Option value="https">https</Option>
                              </Select>
                            </Form.Item>
                          }
                          style={{ width: '90%' }}
                          placeholder="请输入数据抓取网页地址"
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          style={{ color: '#E95454' }}
                          onClick={() => remove(name)}
                          className="ml10 f16 mt10"
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Button
                    type="dashed"
                    className="mt8"
                    onClick={() => add()}
                    style={{ width: '100%' }}
                    icon={<PlusOutlined />}
                  >
                    新增
                  </Button>
                </>
              )}
            </Form.List>
          </>
        )}
      </Form>
      <div className="flex-r-c mt32">
        {false && (
          <Button
            style={{ flex: 1 }}
            className={'mr10'}
            onClick={() => {
              chrome.storage?.local.set({ settingInfo }, () => {
                form.setFieldsValue(settingInfo);
                message.success('恢复默认配置');
              });
            }}
          >
            恢复默认配置
          </Button>
        )}
        <Button
          className={'ml10'}
          style={{ flex: 1 }}
          type={'primary'}
          onClick={() => {
            form.validateFields().then((res) => {
              chrome.storage?.local.set({ settingInfo: res }, () => {
                message.success('保存成功');
              });
            });
          }}
        >
          保存
        </Button>
      </div>
    </PageContainer>
  );
};

export default SettingPage;
