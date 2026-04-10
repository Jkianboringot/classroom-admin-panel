import { CreateButton } from '@/components/refine-ui/buttons/create'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import React from 'react'

function list() {
    return (
        <ListView>
            <Breadcrumb/>

            <div>list</div>
            <CreateButton></CreateButton>
        </ListView>
    )
}

export default list