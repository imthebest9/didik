import React, { useState } from 'react';
import MeetingCard from '../Attachment/MeetingCard';
import NotesCard from '../Attachment/NotesCard';
import DashboardMenu from './DashboardMenu';
import EditSectionModal from './EditSectionModel';
import nookies from 'nookies';
import DeleteSectionModal from './DeleteSectionModal';

const LessonCard = ({
  sectionId,
  sectionDate,
  sectionTitle,
  sectionDesc,
  meetingLink,
  startTime,
  endTime,
  platform,
  notesLink,
  handleDelete,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeDeleteModal = () => setOpenDeleteModal(false);
  return (
    <div style={{ backgroundColor: '#79E0F0' }} class="p-5 mb-4 w-full border rounded-lg">
      <div className="flex">
        <div className="w-full">
          <time class="text-lg font-semibold text-gray-900 ">
            {sectionDate}
          </time>
          <h1 class="section-title">{sectionTitle}</h1>
        </div>
        {nookies.get().userRole === 'Tutor' ? (
          <DashboardMenu onDelete={() => setOpenDeleteModal(true)} />
        ) : (
          <></>
        )}
        <DeleteSectionModal
          isOpen={openDeleteModal}
          handleDelete={handleDelete}
          closeModal={closeDeleteModal}
          sectionId={sectionId}
        />
      </div>
      <ol class="mt-3 divide-y divider-gray-200 ">
        <li>
          <div class="text-gray-600 ">
            <div class="section-para mb-7">
              <p>{sectionDesc}</p>
            </div>
            <h3 class="h3-font font-bold">Sources</h3>
            <div class="flex text-sm font-normal mt-4">
              <MeetingCard
                platform={platform}
                meetingLink={meetingLink}
                startTime={startTime}
                endTime={endTime}
              />
              <NotesCard notesLink={notesLink} />
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default LessonCard;
