import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Upload,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
import Editor from "@/pages/utils/Editor"

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
class Avatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
    }
  
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      );
    }
  }

  
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log(fieldsValue);
      handleAdd(fieldsValue);
    });
  };

  const setcontent = (html,txt) => {
    this.setState({postText:html,postContent:txt });
  }

  return (
    <Modal
      width="1240px"
      destroyOnClose
      title="发布新闻"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入至少2个字符的标题！', min: 2 }],
        })(<Input placeholder="请输入标题" />)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
        {form.getFieldDecorator('img', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 2 }],
        })(<Input placeholder="请输入编辑人员" />)}
      </FormItem> */}

    {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
        {form.getFieldDecorator('img', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 2 }],
        })(<Avatar/>)}
    </FormItem> */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编辑人员">
        {form.getFieldDecorator('editor', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 2 }],
        })(<Input placeholder="请输入编辑人员" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布日期">
        {form.getFieldDecorator('publishDate', {
          rules: [{ required: true, message: '请选择发布日期！'}],
        })(<DatePicker/>)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
        {form.getFieldDecorator('editor', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 1 }],
        })(<Input visible="false" placeholder="请输入编辑人员" />)}
      </FormItem> */}
     {/* {<div>
        <Editor onChange={this.setcontent} isCommited={this.props.isCommited} />
     </div> */}

     {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
        {form.getFieldDecorator('content', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 1 }],
        })(<Editor/>)}
      </FormItem> */}
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ loading,news }) => ({
  news,
  loading: loading.models.rule,
}))
@Form.create()
class News extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    catalog: null,
  };

  columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      title: '图片',
      dataIndex: 'img',
    },
    {
      title: '编辑人员',
      dataIndex: 'editor',
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },

    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          {/* <Divider type="vertical" />
          <a href="">订阅警报</a> */}
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    
    let catalog = this.props.match.params.catalog;
    this.setState({
      catalog: catalog,
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'news/fetchArticleBySmallCatalog',
      payload:{
          smallCatalog: catalog,
          currentPage: "1",
          pageSize: "10"
      }
    });
  }
  componentDidUpdate(){
    let catalog = this.props.match.params.catalog;

    if(this.state.catalog !=catalog){
      let catalog = this.props.match.params.catalog;
      this.setState({
        catalog: catalog,
      })
      const { dispatch } = this.props;
      dispatch({
        type: 'news/fetchArticleBySmallCatalog',
        payload:{
            smallCatalog: catalog,
            currentPage: "1",
            pageSize: "10"
        }
      });
    }
    // console.log("componentDidUpdate----" + catalog);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {

    console.log("handleStandardTableChange---");
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      smallCatalog:'1',
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'news/fetchArticleBySmallCatalog',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     desc: fields.desc,
    //   },
    // });
    // let formData = new FormData();
    // formData.append("title",fields.title);
    // formData.append("publishDate",fields.publishDate);

    dispatch({
        type: 'news/addArticle',
        payload: {
            title: fields.title,
            editor: fields.editor,
        },
      });
  
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return this.renderSimpleForm();
  }

  render() {
    const {
      news: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default News;
