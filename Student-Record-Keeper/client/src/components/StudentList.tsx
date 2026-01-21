import { useState } from "react";
import { useStudents, useDeleteStudent } from "@/hooks/use-students";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Trash2, 
  Users, 
  Loader2, 
  Inbox,
  Mail,
  Phone,
  User
} from "lucide-react";
import { Student } from "@shared/schema";

type SearchField = "name" | "email" | "phone";

export function StudentList() {
  const { data: students, isLoading, error } = useStudents();
  const deleteStudent = useDeleteStudent();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("name");

  // Dynamic filtering
  const filteredStudents = students?.filter((student) => {
    const value = student[searchField].toLowerCase();
    return value.includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white/50 rounded-xl border border-dashed border-slate-300">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium">Loading class registry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl border border-red-100">
        <p className="font-semibold">Unable to load students</p>
        <p className="text-sm mt-1 opacity-80">{error.message}</p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-xl shadow-black/5 bg-white h-full flex flex-col">
      <CardHeader className="border-b border-slate-50 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Class Directory</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredStudents?.length} students found
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search by ${searchField}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
            <Select
              value={searchField}
              onValueChange={(value) => setSearchField(value as SearchField)}
            >
              <SelectTrigger className="w-[110px] bg-slate-50 border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-auto">
        {!filteredStudents?.length ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No students found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              {searchQuery 
                ? `No students found matching "${searchQuery}" in ${searchField}.`
                : "The class directory is empty. Add a student to get started."}
            </p>
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[30%] font-semibold pl-6">Student Name</TableHead>
                  <TableHead className="w-[30%] font-semibold">Email</TableHead>
                  <TableHead className="w-[25%] font-semibold">Phone</TableHead>
                  <TableHead className="w-[15%] text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-slate-50/80 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-primary font-bold text-xs">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm">{student.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-mono">{student.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => deleteStudent.mutate(student.id)}
                        disabled={deleteStudent.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
