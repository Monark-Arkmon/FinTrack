import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Space,
  message
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import './Modal.css';

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  const [tags, setTags] = useState(['food', 'education', 'office']);
  const [newTag, setNewTag] = useState('');
  const [addingTag, setAddingTag] = useState(false);

  const handleAddTag = (e) => {
    e?.stopPropagation?.();
    if (!newTag) {
      setAddingTag(false);
      return;
    }

    const lowerCaseTag = newTag.toLowerCase();
    if (!tags.includes(lowerCaseTag)) {
      setTags([...tags, lowerCaseTag]);
      message.success('Tag added successfully!');
    } else {
      message.error('This tag already exists!');
    }
    setNewTag('');
    setAddingTag(false);
  };

  const selectDropdown = (menu) => (
    <div onClick={e => e.stopPropagation()}>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      {addingTag ? (
        <Space style={{ padding: '0 8px 4px' }}>
          <Input
            placeholder="Enter new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onPressEnter={handleAddTag}
          />
          <Button type="text" icon={<PlusOutlined />} onClick={handleAddTag}>
            Add
          </Button>
        </Space>
      ) : (
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          onClick={() => setAddingTag(true)}
          style={{ padding: '4px 8px' }}
        >
          Add More Tags
        </Button>
      )}
    </div>
  );

  const handleFormFinish = (values) => {
    onFinish(values, "expense");
    form.resetFields();
  };

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={() => {
        handleExpenseCancel();
        setAddingTag(false);
        setNewTag('');
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            className="custom-input"
            disabledDate={() => false}
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select 
            dropdownRender={selectDropdown}
            className="custom-input"
          >
            {tags.map(tag => (
              <Select.Option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;