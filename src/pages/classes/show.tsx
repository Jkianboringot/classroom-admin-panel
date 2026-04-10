import { ShowView, ShowViewHeader } from '@/components/refine-ui/views/show-view'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { bannerPhoto } from '@/lib/cloudinary.js'
import { ClassDetails } from '@/types'
import { AdvancedImage } from '@cloudinary/react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useShow } from '@refinedev/core'
import { Divide } from 'lucide-react'
import React from 'react'

function show() {

  const { query } = useShow<ClassDetails>({ resource: 'classes' })

  const classDetails = query.data?.data
  const { isLoading, isError } = query

  if (isLoading || isError || !classDetails) {
    return (
      <ShowView className='class-view class-show'>
        <ShowViewHeader resource='classes' title='Class details' />

        <p className="state-message">
          {isLoading ? 'Loading class details...' : isError ? 'Failed to load class details...' : ''}
        </p>
      </ShowView>
    )

  }

  const teacherName = classDetails.teacher?.name ?? 'Unknown'
  const teacherInitials = teacherName.split(' ').filter(Boolean).slice(0, 2)
    .map((part) => part[0]?.toUpperCase()).join('')

  const placeholderUrl = `https://placeholder.co/600x400?text${encodeURIComponent(teacherInitials || 'N/A')}`

  const { name,
    description,
    status,
    capacity,
    bannerUrl,
    bannerCldPubId,
    subject,
    teacher,
    department,

  } = classDetails //distructure what is in classdetails


  return (
    <ShowView className='class-view class-show'>
      <ShowViewHeader resource='classes' title='Class details' />
      <div className="banner">

        {bannerUrl ? (<AdvancedImage alt='Class Banner' cldImg={bannerPhoto(bannerCldPubId ?? '', name)} />) : <div className="placeholder" />}

      </div>
      <Card className='details-card'>
        <div className="details-header">
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>

          <div>
            <Badge variant='outline'>{capacity}</Badge>
            <Badge variant={status === 'active' ? 'default' : 'secondary'}>{status.toUpperCase()}</Badge>
          </div>
        </div>

        <div className="details-grid">
          <div className="instructor">
            <p>Instructor</p>
            <div>
              <img src={teacher?.image ?? placeholderUrl} alt={teacherName} />

              <div>
                <p>{teacherName}</p>
                <p>{teacher?.email}</p>

              </div>
            </div>
          </div>

          <div className="department">
            <p>Department</p>

            <div>
              <p>{department?.name}</p>
              <p>{department?.description}</p>

            </div>
          </div>
        </div>


        <Separator />

        <div className="subject">
          <p>Subject</p>

          <div>
            <Badge>Code: {subject?.code}</Badge>
            <p>{subject?.name}</p>
            <p>{subject?.description}</p>
          </div>

        </div>
        <Separator />

        <div className="join">
          <h2>Join Class</h2>

          <ol>
            <li>Ask you teacher for the invite code</li>
            <li>Click on "Join Class" button</li>
            <li>Paste the code and click "join"</li>
          </ol>
        </div>

        <Button size="lg" className='w-full'>Join Class</Button>

      </Card>

    </ShowView >
  )
}

export default show


// for some erason main is not pulling that great