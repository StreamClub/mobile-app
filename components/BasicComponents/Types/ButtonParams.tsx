export type ButtonParams = {
  buttonText: string;
  fontSize: 'small' | 'medium' | 'big';
  buttonSize?: 'small' | 'medium' | 'big' | 'auto';
  onPress: (...params: any[]) => void;
  disabled?: boolean;
  style?: object;
  icon?: string; 
  type: 'primary' | 'secondary';
}