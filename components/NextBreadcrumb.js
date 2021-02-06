import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import NextLink from 'next/link';

const NextBreadcrumb = ({ pagePath, pageName }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href='/' passHref>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <NextLink href={`/${pagePath}`} passHref>
          <BreadcrumbLink isCurrentPage>{pageName}</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
