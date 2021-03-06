import React, {Suspense} from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import useResizeAware from 'react-resize-aware';
import { Button } from "../../../common/Button";
import { ContentBlockProps } from "../types";

import {
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
} from "./styles";

const WaveComponent = React.lazy(() => import('../../canvas/WaveBackground'));

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [resizeListener, sizes] = useResizeAware();

  return (
    <RightBlockContainer>
      {resizeListener}
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={24} md={24} sm={24} xs={24}>
            {id === 'intro' && (
              <Suspense fallback={<></>}>
                <WaveComponent
                  height={sizes.height !* 1.3 || window.innerHeight}
                />
              </Suspense>
            )}
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <ButtonWrapper>
                {typeof button === "object" &&
                  button.map((item: any, id: number) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        fixedWidth={true}
                        onClick={() => scrollTo("about")}
                      >
                        {t(item.title)}
                      </Button>
                    );
                  })}
              </ButtonWrapper>
            </ContentWrapper>
          </Col>
        </Row>
    </RightBlockContainer>
  );
};

export default withTranslation()(RightBlock);
