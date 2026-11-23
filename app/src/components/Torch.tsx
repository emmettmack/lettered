import { SvgXml } from 'react-native-svg';
import { torchXml } from './torchXml';

/** The lettered torch, as vector. Aspect 174:520. */
export function Torch({ height = 220 }: { height?: number }) {
  return <SvgXml xml={torchXml} height={height} width={(height * 174) / 520} />;
}
