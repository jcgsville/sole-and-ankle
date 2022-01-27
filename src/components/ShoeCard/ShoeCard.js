import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const onSale = typeof salePrice === 'number'
  const variant = onSale
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  let cornerFlag
  switch (variant) {
    case 'on-sale':
      cornerFlag = <SaleFlag>Sale</SaleFlag>
      break;
    case 'new-release':
      cornerFlag = <JustReleasedFlag>Just Released!</JustReleasedFlag>
      break;
    default:
      cornerFlag = <></>
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={onSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {typeof salePrice === 'number' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : <></> }
        </Row>
        {cornerFlag}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${({ onSale }) => onSale ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const CornerFlag = styled.div`
  padding-top: 7px;
  padding-bottom: 9px;
  padding-inline: 10px;
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  font-size: ${14/16}rem;
  border-radius: 2px;
`

const SaleFlag = styled(CornerFlag)`
  background-color: ${COLORS.primary};
`

const JustReleasedFlag = styled(CornerFlag)`
  background-color: ${COLORS.secondary};
`

export default ShoeCard;
