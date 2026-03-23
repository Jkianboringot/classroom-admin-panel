import { CreateButton } from '@/components/refine-ui/buttons/create'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Search } from 'lucide-react'
import React, { use, useState } from 'react'

const SubjectsList = () => {


    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('all');

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

                        this is just ok from 
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

            
        </ListView>
    )
}

export default SubjectsList