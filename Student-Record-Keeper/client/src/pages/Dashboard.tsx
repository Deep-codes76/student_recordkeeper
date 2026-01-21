import { StudentForm } from "@/components/StudentForm";
import { StudentList } from "@/components/StudentList";
import { GraduationCap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Student Portal
              </h1>
              <p className="text-slate-500 font-medium">
                Manage your class directory and student information
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            <StudentForm />
            
            {/* Helpful Widget / Tip Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-xl">
              <h3 className="font-semibold text-lg mb-2">Pro Tip</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Use the search dropdown to filter specifically by email addresses or phone numbers when names are similar.
              </p>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8 min-h-[600px]">
            <StudentList />
          </div>
        </div>
      </div>
    </div>
  );
}
