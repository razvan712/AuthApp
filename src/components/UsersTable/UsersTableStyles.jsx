import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 1rem;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  min-height: 700px;
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  max-width: 500px;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.25);
  }
`;

export const StyledTable = styled.table`
  overflow-x: auto;
  border-collapse: collapse;
  margin-top: 1rem;
  width: 100%;
`;

export const StyledThead = styled.thead`
  background-color: #999;
  color: white;
  max-width: 200px;
`;

export const StyledTh = styled.th`
  padding: 10px 20px;
  text-align: left;
  max-width: 200px;
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: calc(100% - 16px);
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;



export const StyledTd = styled.td`
  padding: 8px 20px;
  border-bottom: 1px solid #ddd;
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 16%;
`;

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

export const PaginationItem = styled.li`
  margin: 0 5px;
`;

export const PaginationButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.variant === "delete" ? "#f44336" : "#007bff"};
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  width: 70px;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#dc3545" : "#0056b3"};
  }

  &:focus {
    outline: none;
  }
`;
