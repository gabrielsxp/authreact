import styled from 'styled-components'

export const ResultWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  border-top-color: transparent;
  max-height: 300px;
  overflow: auto;
`
export const CardContainer = styled.div`
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  > img {
    width: auto;
    height: 45px;
  }
  > p {
    font-size: 16px;
    line-height: 20px;
    color: #333333;
    font-weight: 600;
    margin-left: 15px;
  }
  &:hover {
    background-color: #dedede;
    > p {
      color: #007bff;
    }
  }
`
