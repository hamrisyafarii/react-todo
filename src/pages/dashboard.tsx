import { PageContainer } from "@/components/Layouts/PageContainer";
import TaskList from "@/components/Tasks/TaskList";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { SectionContainer } from "@/components/Layouts/SectionContainer";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <PageContainer>
        <SectionContainer padded>
          <div className="py-8 ">
            <TaskList />
          </div>
        </SectionContainer>
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Dashboard;
