import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser, updateUser, useGetUsers } from "../../api/user";
import {
  TableContainer,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTr,
  StyledTd,
  PaginationContainer,
  PaginationList,
  PaginationItem,
  PaginationButton,
  StyledButton,
  SearchInput,
  SearchContainer,
  StyledSelect,
  StyledInput,
} from "./UsersTableStyles";
import Dialog from "../Dialog/Dialog";

const UsersTable = () => {
  const { users, usersLoading, isError, usersRefetch } = useGetUsers();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const queryClient = useQueryClient();

  const updateMutation = useMutation((user) => updateUser(user.id, user), {
    onSuccess: () => {
      setUpdateDialog(false);
      setEditingUser(null);
      usersRefetch();
    },
    onError: (error) => {
      if (Array.isArray(error.response?.data)) {
        setErrorMessages(error.response.data);
      } else {
        setErrorMessages(["Failed to create user."]);
      }
    },
  });

  const deleteMutation = useMutation((userId) => deleteUser(userId), {
    onSuccess: () => {
      setIsDialogOpen(false);
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      if (Array.isArray(error.response?.data)) {
        setErrorMessages(error.response.data);
      } else {
        setErrorMessages([{ message: error.response.data?.message }]);
      }
    },
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (user) => setEditingUser({ ...user });
  const cancelEdit = () => setEditingUser(null);
  const saveEdit = () => {
    if (editingUser) {
      setErrorMessages([]);

      setUpdateDialog(true);
    }
  };

  const confirmDelete = (user) => {
    setErrorMessages([]);
    setDeletingUser(user);
    setIsDialogOpen(true);
  };

  const filteredUsers = users?.filter((user) => {
    let matchesSearch = true;
    let matchesGender = !genderFilter || user.gender === genderFilter;
    let matchesStatus = !statusFilter || user.status === statusFilter;

    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      switch (searchType) {
        case "id":
          matchesSearch = user.id.toString().includes(lowercasedSearchTerm);
          break;
        case "name":
          matchesSearch = user.name
            .toLowerCase()
            .includes(lowercasedSearchTerm);
          break;
        case "email":
          matchesSearch = user.email
            .toLowerCase()
            .includes(lowercasedSearchTerm);
          break;
        default:
          matchesSearch = true;
          break;
      }
    }

    return matchesSearch && matchesGender && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (usersLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Failed to get users{" "}
        <StyledButton onClick={usersRefetch}>retry</StyledButton>
      </div>
    );

  return (
    <>
      <TableContainer>
        <div>
          <h2
            style={{
              textAlign: "center",
              margin: "0",
            }}
          >
            User List
          </h2>
          <h3
            style={{
              textAlign: "end",
              margin: "0 20px 0 0",
            }}
          >
            Filters
          </h3>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder={`Search users by ${searchType}`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <StyledSelect onChange={(e) => setSearchType(e.target.value)}>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
              </StyledSelect>
              <StyledSelect onChange={(e) => setGenderFilter(e.target.value)}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </StyledSelect>
              <StyledSelect onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </StyledSelect>
            </div>
          </SearchContainer>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>ID</StyledTh>
                <StyledTh>Name</StyledTh>
                <StyledTh>Email</StyledTh>
                <StyledTh>Gender</StyledTh>
                <StyledTh>Status</StyledTh>
                <StyledTh>Actions</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              {currentUsers.map((user) => (
                <StyledTr key={user.id}>
                  <StyledTd>{user.id}</StyledTd>
                  <StyledTd>
                    {editingUser?.id === user.id ? (
                      <StyledInput
                        value={editingUser.name}
                        onChange={handleEditChange}
                        name="name"
                      />
                    ) : (
                      user.name
                    )}
                  </StyledTd>
                  <StyledTd>
                    {editingUser?.id === user.id ? (
                      <StyledInput
                        value={editingUser.email}
                        onChange={handleEditChange}
                        name="email"
                        type="email"
                      />
                    ) : (
                      user.email
                    )}
                  </StyledTd>
                  <StyledTd>
                    {editingUser?.id === user.id ? (
                      <StyledSelect
                        value={editingUser.gender}
                        onChange={handleEditChange}
                        name="gender"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </StyledSelect>
                    ) : (
                      user.gender
                    )}
                  </StyledTd>
                  <StyledTd>
                    {editingUser?.id === user.id ? (
                      <StyledSelect
                        value={editingUser.status}
                        onChange={handleEditChange}
                        name="status"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </StyledSelect>
                    ) : (
                      user.status
                    )}
                  </StyledTd>
                  <StyledTd>
                    {editingUser?.id === user.id ? (
                      <>
                        <StyledButton onClick={saveEdit}>Save</StyledButton>
                        <StyledButton onClick={cancelEdit}>Cancel</StyledButton>
                      </>
                    ) : (
                      <>
                        <StyledButton onClick={() => startEdit(user)}>
                          Edit
                        </StyledButton>
                        <StyledButton
                          variant="delete"
                          onClick={() => confirmDelete(user)}
                        >
                          Delete
                        </StyledButton>
                      </>
                    )}
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </div>
        <PaginationContainer>
          <PaginationList>
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationButton onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </PaginationButton>
                </PaginationItem>
              )
            )}
          </PaginationList>
        </PaginationContainer>
      </TableContainer>
      {isDialogOpen && (
        <Dialog
          errorMessages={errorMessages}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          btnText="Delete"
          buttonAction={() => deleteMutation.mutate(deletingUser.id)}
          text="Are you sure you want to delete this user?"
        />
      )}
      {updateDialog && (
        <Dialog
          errorMessages={errorMessages}
          isOpen={updateDialog}
          onClose={() => setUpdateDialog(false)}
          btnText="Update"
          buttonAction={() => {
            if (editingUser) {
              updateMutation.mutate(editingUser);
            }
          }}
          text="Are you sure you want to update this user?"
        />
      )}
    </>
  );
};

export default UsersTable;
