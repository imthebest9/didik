import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { addSection, deleteSection, getSingleDashboard } from '../../api';
import AddSectionModal from '../../components/Dashboard/AddSectionModal';
import DashboardHeader from '../../components/DashboardHeader';
import LessonCard from '../../components/Dashboard/LessonCard';
import OverallProgressCard from '../../components/OverallProgressCard';
import ReminderCard from '../../components/ReminderCard';
import TabsRender from '../../components/Tabs';
import withAuth from '../../HOC/withAuth';
import Lessons from '../../dummyData/Lessons';
import { toast } from 'react-toastify';
import EditSectionModal from '../../components/Dashboard/EditSectionModel';
import Loading from '../../components/Loading';
import nookies from 'nookies';
import NavBar from '../../components/Header';

const Dashboard = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const closeAddModal = () => setOpenAddModal(false);

  const dashboardId = router.query.dashboardId;

  const handleAddSection = async (data) => {
    try {
      const newSection = await addSection(data);
      toast.success('New Section Added');
      closeAddModal();
    } catch (err) {
      toast.error('Fail to add section');
    }
  };

  const getDashboardDetails = async () => {
    try {
      const details = await getSingleDashboard(dashboardId);
      setDashboard(details);
      console.log(details.student.role);
      setIsLoading(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async (data, closeDeleteModal) => {
    try {
      setIsLoading(true);
      setDeleting(true);
      const section = await deleteSection(data);
      toast.success('Section deleted');
      closeDeleteModal();
      setDeleting(false);
      setIsLoading(false);
    } catch (err) {
      toast.error('Section delete failed');
    }
  };
  useEffect(() => {
    getDashboardDetails();
    console.log(dashboard);
  }, [router, openAddModal, deleting]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />

      <section className="md:p-0 p-4 mt-20 box-content">
        <div class="grid lg:grid-flow-col gap-4">
          <div class="md:col-span-2 gap-4">
            <div class="flex md:p-0 p-4 mx-4 my-2 max-w-screen-xl">
              <ReminderCard
                name={
                  nookies.get().userRole === 'Student'
                    ? dashboard.student
                    : dashboard.tutor
                }
              />{' '}
              <OverallProgressCard user = {nookies.get().userRole === 'Student'
                    ? dashboard.tutor
                    : dashboard.student}  />
            </div>
            <div className="col-start-1 md:p-0 p-4 mt-20 mx-4 max-w-screen-xl box-content ">
              <h1 className="h1-lesson-font mb-5">Lessons</h1>
              {dashboard.sections?.map((lesson) => {
                return (
                  <LessonCard
                    sectionId={lesson._id}
                    handleDelete={handleDelete}
                    sectionDate={new Date(lesson.sectionDate).toDateString()}
                    sectionTitle={lesson.sectionTitle}
                    sectionDesc={lesson.sectionDesc}
                    startTime={lesson.startTime}
                    endTime={lesson.endTime}
                    meetingLink={lesson.meetingLink}
                    platform={lesson.platform}
                    notesLink={lesson.notesLink}
                  />
                );
              })}
              <AddSectionModal
                handleAddSection={handleAddSection}
                isOpen={openAddModal}
                closeModal={closeAddModal}
                dashboardId={dashboard._id}
              />

              {nookies.get().userRole === 'Tutor' ? (
                <button
                  class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setOpenAddModal(true)}
                >
                  Add Section
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="md:col-span-2 w-full">
            {/* <TabsRender /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Dashboard);
