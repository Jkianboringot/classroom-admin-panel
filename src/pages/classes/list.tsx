import { CreateButton } from '@/components/refine-ui/buttons/create'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { ClassDetails, Subject } from '@/types';
import { useList } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { Image, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/refine-ui/data-table/data-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useMemo, useState } from 'react'
import { ShowButton } from '@/components/refine-ui/buttons/show';







const ClassesList=() =>{


    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');




    const { query: subjectsQuery } = useList<Subject>({
        resource: 'subjects',
        pagination: {
            pageSize: 100
        }
    })


    const { query: teachersQuery } = useList({
        resource: 'users',
          filters: [{ field: 'role', operator: 'eq', value: 'teacher' }],
        pagination: {
            pageSize: 100
        }
    })


    const subjects = subjectsQuery?.data?.data || []
    const subjectsLoading = subjectsQuery.isLoading



    const subjectFilters = selectedSubject === 'all' ? [] : [
        { field: 'subjects', operator: 'eq' as const, value: selectedSubject }
    ]



    const teachers = teachersQuery?.data?.data || [] //this is the data of list, well its the teacherQuery that gets it we just 
    //specifically gets the data part of it
    const teachersLoading = teachersQuery.isLoading



    const teacherFilters = selectedTeacher === 'all' ? [] : [
        { field: 'teacher', operator: 'eq' as const, value: selectedTeacher }
    ]


    const searchFilters = searchQuery ? [
        { field: 'name', operator: 'contains' as const, value: searchQuery }

    ] : []



    const classesTable = useTable<ClassDetails>({

        //columns of the table data
        //useMemo = “remember this value so it doesn’t get recreated every time”
        columns: useMemo<ColumnDef<ClassDetails>[]>(() => [
           {
            id: 'bannerUrl',
            accessorKey: 'bannerUrl',
            size: 80,
            header: () => <p className="column-title ml-2">Banner</p>,
            cell: ({ getValue }) => (
                <div className="flex items-center justify-center ml-2">
                    <img
                        src={getValue<string>() || '/placeholder-class.png'}
                        alt="Class Banner"
                        className="w-10 h-10 rounded object-cover"
                    />
                </div>
            )
        },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Class Name</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>,

                //   this enable column text base Filter, on this specific column(Name)
                filterFn: 'includesString'


            },
            {
                id: 'status',
                accessorKey: 'status',
                size: 100,
                header: () => <p className="column-title ml-2">Status</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'subject',
                accessorKey: 'subject.name',
                size:150,
                header: () => <p className="column-title">Subject</p>,
                //  variant={'secondary'} this change the color of badge
                cell: ({ getValue }) => <Badge variant={'secondary'}>{getValue<string>()}</Badge>,


            },
            {
                id: 'teacher',
                accessorKey: 'teacher.name',
                size: 150,
                header: () => <p className="column-title">Teacher</p>,
                //  variant={'secondary'} this change the color of badge
                cell: ({ getValue }) => <Badge variant={'secondary'}>{getValue<string>()}</Badge>,


            },
            {
                id: 'capacity',
                accessorKey: 'capacity',
                size: 100,
                header: () => <p className="column-title">Capacity</p>,
                cell: ({ getValue }) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>

            },
             {
            id: 'details',
            size: 140,
            header: () => <p className="column-title">Details</p>,
            cell: ({ row }) => <ShowButton resource="classes" recordItemId={row.original.id} variant="outline" size="sm">View</ShowButton>
        }
        ], []),

        refineCoreProps: {
            resource: 'classes',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {

                // spread the filters 
                permanent: [...teacherFilters, ...subjectFilters, ...searchFilters]
            },
            sorters: {
                initial: [
                    { field: 'id', order: 'desc' }
                ]
            }
        }
    });





    return (
        <ListView>
            <Breadcrumb />
            <h1 className='page-title'>Classes</h1>


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
                        <Select value={selectedTeacher}
                            onValueChange={setSelectedTeacher}
                            disabled={teachersLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Filter by Teacher' />


                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='all'>
                                    All Teacher
                                </SelectItem>


                                {teachers.map(d => (
                                    <SelectItem key={d.id}
                                        value={d.name} >
                                        {d.name}

                                    </SelectItem>
                                ))}

                            </SelectContent>
                        </Select>














                        <Select value={selectedSubject}
                            onValueChange={setSelectedSubject}
                            disabled={subjectsLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Filter by Subjects' />


                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='all'>
                                    All Subjects
                                </SelectItem>

                                {subjects.map(d => (
                                    <SelectItem key={d.id}
                                        value={d.name} >
                                        {d.name}

                                    </SelectItem>
                                ))}

                            </SelectContent>
                        </Select>


                        <CreateButton></CreateButton>
                    </div>

                </div>
            </div>


            <DataTable table={classesTable} />


        </ListView>
    )
}

export default ClassesList