import React from 'react';
import { TEST_ID } from '../../constant/TEST_ID';

export const CONTAINER_TAGS = ['ul', 'ol', 'div'];
type ContainerTag = (typeof CONTAINER_TAGS)[number];

export interface Props<T> {
  data: T[];
  renderItem: ({ item: T }) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  containerTag: ContainerTag;
}

const List = <T extends Record<string, { idx: string }>>({
  data,
  renderItem,
  keyExtractor,
  containerTag,
}: Props<T>) => {
  const Container = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLUListElement | HTMLOListElement | HTMLDivElement>) =>
    React.createElement(containerTag, props, children);

  return (
    <Container data-testid={TEST_ID.LIST.LIST}>
      {data.map((item) => {
        const key = keyExtractor(item);
        const contents = renderItem({ item });

        return <React.Fragment key={key}>{contents}</React.Fragment>;
      })}
    </Container>
  );
};

export default List;
