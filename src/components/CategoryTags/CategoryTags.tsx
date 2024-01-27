import { Flex, Tag } from '@chakra-ui/react';
import { type Category } from '@prisma/client';
import NextLink from 'next/link';

export default function CategoryTags<
  T extends { categories: { category: Category }[]; routePrefix: string }
>({ categories, routePrefix }: T) {
  return (
    <Flex gap={2}>
      {categories.map(({ category }) => (
        <CategoryTag
          key={category.id}
          routePrefix={routePrefix}
          {...category}
        />
      ))}
    </Flex>
  );
}

function CategoryTag(props: Category & { routePrefix: string }) {
  return (
    <Tag
      key={props.id}
      as={NextLink}
      href={`${props.routePrefix}/${props.slug}`}
      size='sm'
      bg={props.color}
      outline='2px solid'
      outlineOffset={2}
      outlineColor='transparent'
      transition='150ms ease-in-out'
      _hover={{
        outlineColor: props.color,
      }}
    >
      {props.name}
    </Tag>
  );
}
