import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Filter,
  Grid,
  Plus,
  Search,
  Share2,
  SortAsc,
  Upload,
  Import,
} from "lucide-react";
import { Task } from "../types";
const initialTasks: Task[] = [
  {
    id: 1,
    task: "Launch social media campaign for product",
    submitted: "16-11-2024",
    status: "in-progress",
    assignee: "Aisha Patel",
    url: "www.justlaunched.com",
    submitter: "Sophie Chowdhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    extract: 6200000,
    addnew: null,
  },
  {
    id: 2,
    task: "Update press kit for company rebrand",
    submitted: "28-10-2024",
    status: "need to start",
    assignee: "Vijay Khan",
    url: "www.rebrand.com",
    submitter: "Tyler Perkins",
    priority: "High",
    dueDate: "30-10-2024",
    extract: 3800000,
    addnew: null,
  },
  {
    id: 3,
    task: "Finalize user testing feedback for app",
    submitted: "05-10-2024",
    status: "in-progress",
    assignee: "Mark Johnson",
    url: "www.mytestapp.com",
    submitter: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    extract: 4700000,
    addnew: null,
  },
  {
    id: 4,
    task: "Design new features for the website",
    submitted: "10-10-2024",
    status: "complete",
    assignee: "Emily Green",
    url: "www.newfeatures.com",
    submitter: "Tom Walker",
    priority: "low",
    dueDate: "15-01-2024",
    extract: 5900000,
    addnew: null,
  },
  {
    id: 5,
    task: "Prepare financial report for Q4",
    submitted: "25-10-2025",
    status: "blocked",
    assignee: "Jessica Brown",
    url: "www.stakeholders.com",
    submitter: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2024",
    extract: 2800000,
    addnew: null,
  },
];

const Spreadsheet: React.FC = () => {
  const [data, setData] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<string>("All Orders");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [newTask, setNewTask] = useState<string>("");

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const columnHelper = createColumnHelper<Task>();

  const columns = [
    columnHelper.accessor("id", { header: "#", cell: (info) => info.getValue() }),
    columnHelper.accessor("task", { header: "Task Request", cell: (info) => info.getValue() }),
    columnHelper.accessor("submitted", { header: "Submitted", cell: (info) => info.getValue() }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium capitalize 
          ${
            info.getValue() === "complete"
              ? "bg-green-100 text-green-700"
              : info.getValue() === "in-progress"
                ? "bg-yellow-100 text-yellow-700"
                : info.getValue() === "need to start"
                  ? "bg-slate-400 text-blue-500"
                  : info.getValue() === "blocked"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("assignee", { header: "Assignee", cell: (info) => info.getValue() }),
    columnHelper.accessor("url", {
      header: "URL",
      cell: (info) => (
        <a
          href={`https://${info.getValue()}`}
          className="text-blue-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("submitter", { header: "Submitter", cell: (info) => info.getValue() }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => (
        <span
          className={`text-xs font-semibold rounded px-2 py-0.5 capitalize
          ${
            info.getValue() === "High"
              ? "bg-red-100 text-red-700"
              : info.getValue() === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("dueDate", { header: "Due Date", cell: (info) => info.getValue() }),
    columnHelper.accessor("extract", {
      header: "Est",
      cell: (info) => formatCurrency(info.getValue()),
    }),
    columnHelper.accessor("addnew", { header: "", cell: () => null }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newId = Math.max(...data.map((d) => d.id)) + 1;
      const now = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
      setData([
        ...data,
        {
          id: newId,
          task: newTask,
          submitted: now,
          status: "need to start",
          assignee: "",
          url: "",
          submitter: "",
          priority: "Medium",
          dueDate: now,
          extract: 0,
          addnew: null,
        },
      ]);
      setNewTask("");
      console.log("Task added:", newTask);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 rounded-md shadow flex flex-col gap-4">
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <div className="flex gap-1 items-center text-xs">
            <span className="text-gray-500">Workspace</span>
            <ChevronDown size={10} className="text-gray-400" />
            <span className="text-gray-500">Folder 2</span>
            <ChevronDown size={10} className="text-gray-400" />
            <span className="font-medium text-gray-800">Spreadsheet 3</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
              <input
                className="pl-8 pr-2 py-1 border border-gray-200 rounded-md text-xs w-48"
                placeholder="Search within sheet"
              />
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              JD
            </div>
          </div>
        </div>
        {/* Toolbar */}
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex gap-4 items-center">
            <span className="font-medium text-black">Toolbar</span>
            <button className="hover:text-black flex items-center gap-1">
              Hide Fields <ChevronDown size={14} />
            </button>
            <button className="hover:text-black flex items-center gap-1">
              <SortAsc size={14} /> Sort
            </button>
            <button className="hover:text-black flex items-center gap-1">
              <Filter size={14} /> Filter
            </button>
            <button className="hover:text-black flex items-center gap-1">
              <Grid size={14} /> Cell View
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => console.log("Import clicked")}
              className="border px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100"
            >
              <Import size={16} /> Import
            </button>
            <button
              onClick={() => console.log("Export clicked")}
              className="border px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100"
            >
              <Upload size={16} /> Export
            </button>
            <button
              onClick={() => console.log("Share clicked")}
              className="border px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100"
            >
              <Share2 size={16} /> Share
            </button>
            <button
              onClick={() => console.log("New Action")}
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"
            >
              <Plus size={16} /> New Action
            </button>
          </div>
        </div>
      </div>
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <span className="text-base font-semibold text-gray-800">Q3 Financial Overview</span>

        <div className="flex items-center gap-3 text-sm">
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
            ABC Corp
          </span>
          <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
            Answer
          </span>
          <span className="text-gray-600">Answer Question</span>
          <button
            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
            title="Add"
          >
            +
          </button>
        </div>
      </div>{" "}
      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {table.getFlatHeaders().map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-2 text-left font-medium text-gray-600 cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && <SortAsc size={12} />}
                    {header.column.getIsSorted() === "desc" && <ChevronDown size={12} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2">{data.length + 1}</td>
              <td className="px-4 py-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a task"
                  className="w-full text-sm border-b border-gray-300 focus:outline-none"
                />
              </td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2">{data.length + 2}</td>
              <td className="px-4 py-2"></td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>

            <tr>
              <td className="px-4 py-2">{data.length + 3}</td>
              <td className="px-4 py-2"></td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>

            <tr>
              <td className="px-4 py-2">{data.length + 4}</td>
              <td className="px-4 py-2"></td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>

            <tr>
              <td className="px-4 py-2">{data.length + 5}</td>
              <td className="px-4 py-2"></td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>

            <tr>
              <td className="px-4 py-2">{data.length + 6}</td>
              <td className="px-4 py-2"></td>
              {[...Array(13)].map((_, idx) => (
                <td key={idx} className="px-4 py-2"></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {/* Tabs */}
      <div className="mt-4 bg-white rounded shadow p-2 flex gap-2">
        {["All Orders", "Pending", "Reviewed", "Arrived"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded text-sm ${activeTab === tab ? "bg-gray-200 font-semibold" : "text-gray-500 hover:text-black"}`}
            onClick={() => {
              setActiveTab(tab);
              console.log(`Tab changed to: ${tab}`);
            }}
          >
            {tab}
          </button>
        ))}
        <button className="text-gray-500 hover:text-black">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;
