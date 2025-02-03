import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Checkbox, Card, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { COLLECTION_CREATE_FIELD, COLLECTION_PROPERTIES_TYPE } from '@/pages/Collection/constants';
import styleLess from './index.less';
import { Property, PropertyFormProps } from '../../typings';
import { ErrorMessage } from 'formik';

const { PROPERTIES } = COLLECTION_CREATE_FIELD;

const PropertyForm: React.FC<PropertyFormProps> = ({
  form,
  dataProperties,
  properties,
  setProperties,
  disabled,
}) => {
  const intl = useIntl();

  useEffect(() => {
    if (dataProperties) {
      setProperties({
        ...properties,
        ...dataProperties,
      });
    }
  }, [dataProperties]);

  useEffect(() => {
    if (form) {
      form.setFieldValue(PROPERTIES, properties);
    }
  }, [properties]);

  const handleAddProperty = () => {
    if (Object.keys(properties).length >= 4) {
      return;
    }
    const newKey = `property_${Object.keys(properties).length + 1}`;
    setProperties({
      ...properties,
      [newKey]: { display: '', type: 'text', value: '', required: false, typeUser: '' },
    });
  };

  const handleRemoveProperty = (key: string) => {
    const updatedProperties = { ...properties };
    delete updatedProperties[key];
    setProperties(updatedProperties);
  };

  const handlePropertyChange = (key: string, field: keyof Property, value: any) => {
    const updatedProperties = { ...properties };

    if (field === 'type') {
      updatedProperties[key] = {
        ...updatedProperties[key],
        [field]: value,
        value: value === 'text' ? '' : [{ text: '' }],
      };
    } else {
      updatedProperties[key] = { ...updatedProperties[key], [field]: value };
    }

    setProperties(updatedProperties);
  };

  const handleAddValue = (key: string) => {
    const updatedProperties = { ...properties };
    if (updatedProperties[key].type === 'select') {
      (updatedProperties[key].value as { text: string }[]).push({ text: '' });
      setProperties(updatedProperties);
    }
  };

  const handleRemoveValue = (key: string, valueIndex: number) => {
    const updatedProperties = { ...properties };
    if (updatedProperties[key].type === 'select') {
      updatedProperties[key].value = (updatedProperties[key].value as { text: string }[]).filter(
        (_, i) => i !== valueIndex,
      );
      setProperties(updatedProperties);
    }
  };

  const handleValueChange = (key: string, valueIndex: number, newValue: string) => {
    const updatedProperties = { ...properties };
    if (updatedProperties[key].type === 'select') {
      (updatedProperties[key].value as { text: string }[])[valueIndex].text = newValue;
      setProperties(updatedProperties);
    }
  };

  return (
    <div className={styleLess.properties_from}>
      <div className={styleLess.properties_from__title}>
        {intl.formatMessage({ id: 'collection.management.properties' })}&nbsp;*&nbsp;
      </div>

      {Object.keys(properties).map((key) => {
        const property = properties[key];

        return (
          <Card
            key={key}
            type="inner"
            style={{ marginBottom: 16 }}
            extra={
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveProperty(key)}
                danger
                disabled={disabled}
              >
                {intl.formatMessage({ id: 'collection.management.delete.property' })}
              </Button>
            }
          >
            <Form.Item
              label={intl.formatMessage({ id: 'collection.management.display.name' })}
              required
            >
              <Input
                value={property.display}
                onChange={(e) => handlePropertyChange(key, 'display', e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'collection.management.display.name.placeholder',
                })}
                disabled={disabled}
              />
            </Form.Item>

            <Form.Item label={intl.formatMessage({ id: 'collection.management.type' })}>
              <Select
                value={property.type}
                onChange={(value) => handlePropertyChange(key, 'type', value)}
                options={COLLECTION_PROPERTIES_TYPE}
                disabled={disabled}
              />
            </Form.Item>

            <Form.Item label={intl.formatMessage({ id: 'collection.management.values' })}>
              {property.type === 'select' ? (
                (property.value as { text: string }[]).map((val, valueIndex) => (
                  <Space key={valueIndex} style={{ display: 'flex', marginBottom: 8 }}>
                    <Input
                      value={val.text}
                      onChange={(e) => handleValueChange(key, valueIndex, e.target.value)}
                      placeholder={intl.formatMessage({
                        id: 'collection.management.values.placeholder',
                      })}
                      disabled={disabled}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveValue(key, valueIndex)}
                      danger
                      size="small"
                      disabled={disabled}
                    />
                  </Space>
                ))
              ) : (
                <Input
                  value={property.value as string}
                  onChange={(e) => handlePropertyChange(key, 'value', e.target.value)}
                  placeholder={intl.formatMessage({
                    id: 'collection.management.values.placeholder',
                  })}
                  disabled={disabled}
                />
              )}
              {property.type === 'select' && (
                <Button
                  type="dashed"
                  onClick={() => handleAddValue(key)}
                  icon={<PlusOutlined />}
                  disabled={disabled}
                >
                  {intl.formatMessage({
                    id: 'collection.management.add.value',
                  })}
                </Button>
              )}
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={property.required}
                disabled={disabled}
                onChange={(e) => handlePropertyChange(key, 'required', e.target.checked)}
              >
                Required
              </Checkbox>
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({
                id: 'collection.management.type.user',
              })}
            >
              <Input
                value={property.typeUser}
                onChange={(e) => handlePropertyChange(key, 'typeUser', e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'collection.management.type.user.placeholder',
                })}
                disabled={disabled}
              />
            </Form.Item>
          </Card>
        );
      })}
      {Object.keys(properties).length < 4 && (
        <Button
          type="dashed"
          onClick={handleAddProperty}
          block
          icon={<PlusOutlined />}
          disabled={disabled}
        >
          {intl.formatMessage({
            id: 'collection.management.add.property',
          })}
        </Button>
      )}
      <ErrorMessage
        name={PROPERTIES}
        component="div"
        className={styleLess.properties_from__error}
      />
    </div>
  );
};

export default PropertyForm;
