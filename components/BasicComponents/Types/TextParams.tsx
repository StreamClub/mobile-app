export type TextParams = {
  body: string,
  color?: string,
  style?: object,
  size?: 'big' | 'medium' | 'small';
  fontStyle?: 'italic' | 'normal';
  onLayout?: (...params: any[]) => void;
  numberOfLines?: number;
  max_length?: number;
  onPress?: (...params: any[]) => void;
}