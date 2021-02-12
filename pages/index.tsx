import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const Styled = styled.div`
  background: orange;
`;

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector<any, any>((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user, isLoaded]);

  useEffect(() => {
    setIsLoaded(true);
    dispatch({
      type: 'TEST',
      payload: {
        email: 'bgpark@gmail.com',
        profile: '',
      },
    });
  }, []);

  return (
    <>
      <Styled>hello</Styled>
      <div>{user.email}</div>
    </>
  );
};

export default Index;
