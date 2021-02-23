import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styled from 'styled-components';
import { FormInstance } from 'antd/lib/form';

const FormWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
`;

type Date = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

interface FormValues {
  classname: string;
  date: Date;
  startTime: string;
  endTime: string;
}

interface TimetableFormProps {
  handleSubmit: (form: FormInstance) => (values: FormValues) => void;
}

const TimetableForm = ({ handleSubmit }: TimetableFormProps) => {
  const [form] = Form.useForm();

  return (
    <FormWrapper>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit(form)}
        style={{ width: '100%' }}
      >
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="classname" label="과목명" required>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="요일" required>
            <Select>
              <Select.Option value="MON">월요일</Select.Option>
              <Select.Option value="TUE">화요일</Select.Option>
              <Select.Option value="WED">수요일</Select.Option>
              <Select.Option value="THU">목요일</Select.Option>
              <Select.Option value="FRI">금요일</Select.Option>
            </Select>
          </Form.Item>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="startTime" label="시작시간" required>
            <Select>
              <Select.Option value="09">09:00</Select.Option>
              <Select.Option value="10">10:00</Select.Option>
              <Select.Option value="11">11:00</Select.Option>
              <Select.Option value="12">12:00</Select.Option>
              <Select.Option value="13">13:00</Select.Option>
              <Select.Option value="14">14:00</Select.Option>
              <Select.Option value="15">15:00</Select.Option>
              <Select.Option value="16">16:00</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="endTime" label="종료시간" required>
            <Select>
              <Select.Option value="10">10:00</Select.Option>
              <Select.Option value="11">11:00</Select.Option>
              <Select.Option value="12">12:00</Select.Option>
              <Select.Option value="13">13:00</Select.Option>
              <Select.Option value="14">14:00</Select.Option>
              <Select.Option value="15">15:00</Select.Option>
              <Select.Option value="16">16:00</Select.Option>
              <Select.Option value="17">17:00</Select.Option>
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item>
            <Button type="default" htmlType="submit">
              입력
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </FormWrapper>
  );
};

export default TimetableForm;
