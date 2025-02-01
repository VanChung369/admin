export type CreateOrUpdateProps = {
  collectionId?: string;
};

type CollectionProps = {
  visible: boolean;
  onClose?: () => void;
  setVisible: any;
  collectionId?: string;
};

interface Property {
  display: string;
  type: 'text' | 'select';
  value: string | { text: string }[];
  required: boolean;
  typeUser?: string;
}

interface PropertyFormProps {
  form?: FormikProps<any>;
  dataProperties?: any;
  properties?: any;
  setProperties?: any;
}
