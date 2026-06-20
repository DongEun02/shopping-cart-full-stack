import Image from '../../../shared/ui/Image';
import Row from '../../../shared/layout/Row';
import Flex from '../../../shared/layout/Flex';
import Txt from '../../../shared/ui/Txt';

export default function OrderItem() {
  return (
    <li
      css={{
        padding: '20px 0',
        borderTop: '1px solid #eeeeee',
      }}
    >
      <Row
        left={
          <Image
            width={112}
            height={112}
            alt="상품 이미지"
            styles={{ borderRadius: '8px' }}
          />
        }
        center={
          <Flex
            direction="column"
            gap={20}
            justify="center"
            styles={{ paddingTop: '36px' }}
          >
            <Flex direction="column" gap={4}>
              <Txt variant="label" color="black">
                상품이름
              </Txt>

              <Txt variant="title" color="black">
                35,000원
              </Txt>
            </Flex>

            <Txt variant="label" color="black">
              2개
            </Txt>
          </Flex>
        }
      />
    </li>
  );
}
