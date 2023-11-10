import React from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import S from './style.module.css';

export const HEADING_LEVEL = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
type HeadingLevel = (typeof HEADING_LEVEL)[number];

export interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: HeadingLevel;
}

const Heading = ({ headingLevel, children, className = '', ...res }: Props) => {
  const Heading = ({ children: headingChildren, ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(headingLevel, props, headingChildren);
  const headingStyle: Record<HeadingLevel, string> = {
    h1: S.h1,
    h2: S.h2,
    h3: S.h3,
    h4: S.h4,
    h5: S.h5,
    h6: S.h6,
    p: S.p,
  };

  return (
    <Heading
      data-testid={TEST_ID.HEADING.HEADING}
      className={`${headingStyle[headingLevel]} ${className}`}
      {...res}
    >
      {children}
    </Heading>
  );
};

export default Heading;
