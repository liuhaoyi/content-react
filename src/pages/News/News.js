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
import UploadForm from './UploadForm'

const RangePicker = DatePicker.RangePicker;
  
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
  const { modalVisible, form, handleAdd, handleHtml, handleModalVisible } = props;
  
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      console.log("fieldsValue=" + fieldsValue);
      handleAdd(fieldsValue);
    });
  };

  const setcontent = (html,txt) => {
    handleHtml(html);
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

     <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
       <UploadForm form={form} name="img" max={1}/>
      </FormItem>
      
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
 
     <div>
        <Editor onChange={setcontent} isCommited={props.isCommited} />
     </div>
    </Modal>
  );
});
@Form.create()
class UpdateForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      formVals: {
        title: props.values.title,
        editor: props.values.editor,
        publishDate: props.values.publishDate,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,

    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }
  
  render() {
    const { form } = this.props;
    const { updateModalVisible, handleUpdateModalVisible, handleHtml, handleUpdate } = this.props;
    // const { formVals } = this.state;
    const setcontent = (html,txt) => {
      this.setState({postText:html,postContent:txt });
      handleHtml(html);
    }

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        console.log(fieldsValue);
        handleUpdate(fieldsValue);
      });
    };
  
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑文章"
        visible={updateModalVisible}
        // footer={this.renderFooter(currentStep)}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible()}
      >
      {form.getFieldDecorator('id', {
        initialValue: this.props.values.id,
      })(<Input placeholder="请输入标题" type="hidden"/>)}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入至少2个字符的标题！', min: 2 }],
          initialValue: this.props.values.title,
        })(<Input placeholder="请输入标题" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
        <UploadForm form={form} name="img" max={1} record={{img:[this.props.values.img]}}/>
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编辑人员">
        {form.getFieldDecorator('editor', {
          rules: [{ required: true, message: '请输入至少2个的编辑人员！', min: 2 }],
          initialValue: this.props.values.editor,
        })(<Input placeholder="请输入编辑人员" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布日期">
        {form.getFieldDecorator('publishDate', {
          rules: [{ required: true, message: '请选择发布日期！'}],
          initialValue: moment(this.props.values.publishDate),
        })(<DatePicker/>)}
      </FormItem>

      <div>
          <Editor onChange={setcontent} isCommited={this.props.isCommited} htmlValue={this.props.values.content} ></Editor>
      </div>
      </Modal>
    );
  }
}
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
    // expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    catalog: null,
    html: null,
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
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },

    {
      title: '阅读次数',
      dataIndex: 'readCount',
      align: 'right',
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
      type: 'news/fetchArticleList',
      payload: {
        smallCatalog: this.props.match.params.catalog,
        title: "",
        date:[],
        currentPage: 1,
        pageSize: 10,
      },
    });
  }

  componentDidUpdate(){
    let catalog = this.props.match.params.catalog;
    if(this.state.catalog !=catalog){
      //新菜单；
      let catalog = this.props.match.params.catalog;
      this.setState({
        catalog: catalog,
      })
      const { dispatch } = this.props;
      dispatch({
        type: 'news/fetchArticleList',
        payload: {
          smallCatalog: this.props.match.params.catalog,
          title: "",
          date: [],
          currentPage: 1,
          pageSize: 10,
        },
      });
      //切换菜单，清空查询条件。
      this.handleFormReset();
    }
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      smallCatalog: this.props.match.params.catalog,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'news/fetchArticleList',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'news/removeArticle',
          payload: {
            key: selectedRows.map(row => row.id),
            smallCatalog: this.props.match.params.catalog,
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
        type: 'news/fetchArticleList',
        payload: {
          smallCatalog: this.props.match.params.catalog,
          ...fieldsValue,
          currentPage: 1,
          pageSize: 10,
        },
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
    dispatch({
        type: 'news/addArticle',
        payload: {
            ...fields,
            smallCatalog: this.state.catalog,
            content: this.state.html,
        },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  //修改文章；
  handleHtml = html =>{
    this.setState({html:html});
  }

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
        type: 'news/addArticle',
        payload: {
            ...fields,
            smallCatalog: this.state.catalog,
            content: this.state.html,
        },
    });
    message.success('添加成功');
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
            <FormItem label="标题">
              {getFieldDecorator('title')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('date')(   
              <RangePicker
                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                showTime
                format="YYYY/MM/DD"
                // onChange={onChange}
              />)}
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
        {/* <Menu.Item key="approval">批量审批</Menu.Item> */}
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleHtml : this.handleHtml,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  {/* <Button>批量操作</Button> */}
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              rowKey='id'
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
          <UpdateForm
            {...parentMethods}
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
      </PageHeaderWrapper>
    );
  }
}
export default News;
