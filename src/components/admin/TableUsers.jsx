import { changeUserRole, changeUserStatus, listAllUsers } from "@/api/admin";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useEcomStore from "@/store/ecom-store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserEmpty } from "../empty/Empty";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const checkIsAdmin = useEcomStore((state) => state.checkIsAdmin);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changingUserId, setChangingUserId] = useState(null);

  useEffect(() => {
    getAllUsers(token);
  }, [token]);

  const getAllUsers = async (token) => {
    try {
      const res = await listAllUsers(token);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUserStatus = async (userId, currentStatus) => {
    // get userId for disabled button
    setChangingUserId(userId);

    // optimistic update status (UI)
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, enable: !currentStatus } : user
      )
    );

    const value = {
      id: userId,
      enable: !currentStatus,
    };

    try {
      await changeUserStatus(token, value);
      checkIsAdmin(!currentStatus, token);
      // getAllUsers(token);
      toast.success("Change Status Success");
    } catch (error) {
      console.log(error);
      // Rollback if error
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, enable: currentStatus } : user
        )
      );
    } finally {
      setChangingUserId(null);
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    const value = {
      id: userId,
      role: newRole.toLowerCase(),
    };

    try {
      const res = await changeUserRole(token, value);
      checkIsAdmin(value.role === "admin", token);
      toast.success(res.data);
    } catch (error) {
      console.log(error);
      checkIsAdmin(false, token);
    }
  };

  const changeButtonStatusColor = (userStatus) => {
    switch (userStatus) {
      case true:
        return "bg-green-500";
      case false:
        return "bg-red-500";
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-md">
      {loading ? (
        <div className="min-h-[70vh] flex items-center justify-center gap-4">
          <Spinner />
          Loading users
        </div>
      ) : users.length === 0 ? (
        <UserEmpty />
      ) : (
        <div>
          <h2 className="scroll-m-20 mb-5 text-2xl font-semibold tracking-tight first:mt-0">
            User Management
          </h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user, index) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Select
                            name="userRole"
                            defaultValue={user.role}
                            onValueChange={(value) =>
                              handleChangeUserRole(user.id, value)
                            }
                          >
                            <SelectTrigger id="userRole" className="w-25">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">user</SelectItem>
                              <SelectItem value="admin">admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell className="w-[100px]">
                        <div
                          className={`${changeButtonStatusColor(
                            user.enable
                          )} text-white px-2 py-1 rounded-full text-center`}
                        >
                          {user.enable ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-3">
                        <Button
                          className={"shadow-md border"}
                          variant={user.enable ? "outline" : "default"}
                          onClick={() =>
                            handleChangeUserStatus(user.id, user.enable)
                          }
                          disabled={changingUserId === user.id}
                          size="lg"
                        >
                          {changingUserId === user.id ? (
                            <Spinner />
                          ) : user.enable ? (
                            "Disable"
                          ) : (
                            "Enable"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
export default TableUsers;
