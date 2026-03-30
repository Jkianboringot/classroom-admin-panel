import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subject } from '@/types'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { Filter, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const SubjectsList = () => {


    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('all');


        //#423 { field: 'department', operator: 'eq' as const, value: selectedDepartment } 
    // i think what this does is check if selectedDepartment is all if it is do nothing
    // else if its not all then we take the content of department and compare it with value
    // and it does by forloop by as const, so its pretty much foreach field:department find the equal 
    // for the givin value

    //update on my thought on the top(#423):
        //- the as const is not a forloop its just a hint type so thier is no forloop
        //- its just this 'Get data where department is equal to selectedDepartment' i just over complicated it
    const departmentFilters = selectedDepartment === 'all' ? [] : [
        { field: 'department', operator: 'eq' as const, value: selectedDepartment }
    ]

    // if searchQuery has a value take that value and search through the field names 
    // that has the current content of search qeury else do nothing 
    const searchFilters = searchQuery ? [
        { field: 'name', operator: 'contains' as const, value: searchQuery }
    ] : []

    // what show the data in the table
    // subject is the type fo class , wierd its type script thing
    //if you see anything like that its type script
    const subjectTable = useTable<Subject>({

        //columns of the table data
        //useMemo = “remember this value so it doesn’t get recreated every time”
        columns: useMemo<ColumnDef<Subject>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: () => <p className="column-title ml-2">Code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Name</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>,

 //   this enable column text base Filter, on this specific column(Name)
                filterFn: 'includesString'


            },
            {
                id: 'department',
                accessorKey: 'department.name',
                size: 150,
                header: () => <p className="column-title">Department</p>,
                //  variant={'secondary'} this change the color of badge
                cell: ({ getValue }) => <Badge variant={'secondary'}>{getValue<string>()}</Badge>,


            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 300,
                header: () => <p className="column-title">Description</p>,
                cell: ({ getValue }) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>

            }
        ], []),

        refineCoreProps: {
            resource: 'subjects',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {

                // spread the filters 
                permanent: [...departmentFilters, ...searchFilters]
            },
            sorters: {
                initial:[
                    {field:'id',order:'desc'}
                ]
            }
        }
    });

    return (
        <ListView>
            <Breadcrumb />

            <h1 className='page-title'>Subjects</h1>

            <div className='intro-row'>
                <p>Quick access to essential metrics and management tools</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className='search-icon' />

                        <Input
                            type='text' placeholder='Search by name...'
                            className='pl-10 w-full'
                            value={searchQuery}
                            // what this thing is doing is when the value in input change we take that 
                            // value store it in e then we give it to setSearchQuery as a value e.target.value
                            onChange={(e) => setSearchQuery(e.target.value)} />

                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select value={selectedDepartment}
                            onValueChange={setSelectedDepartment}>
                            <SelectTrigger>
                                <SelectValue placeholder='Filter by Department' />


                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='all'>
                                    All Department
                                </SelectItem>

                                {/*                                 
problem, show data for department selector ,
solution:
we create a constants folder and have a file where we any constant value, 
the value will be givin like this below, the value is the acutally value and 
label just whats shown this is good becuase we can change any of them anytime we want
and it will not change anything else , jsut the name/label, like we want math to be mathematic
but we dont want to redo the backend then we just change the label 
                        [
  { value: 'CS', label: 'CS' },
  { value: 'Math', label: 'Math' },
  { value: 'English', label: 'English' }
]
we will map on each one get each value of object and put it in d so now we can access value and label */}
                                {DEPARTMENT_OPTIONS.map(d => (
                                    <SelectItem key={d.value}
                                        value={d.value}>
                                        {d.label}
                                    </SelectItem>
                                ))}

                            </SelectContent>
                        </Select>

                        <CreateButton></CreateButton>
                    </div>

                </div>
            </div>

            {/* table that shows the data */}
            <DataTable table={subjectTable} />


        </ListView>
    )
}

export default SubjectsList