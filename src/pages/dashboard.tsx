import { PageContainer } from "@/components/Layouts/PageContainer";
import TaskList from "@/components/Tasks/TaskList";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="py-8">
          <TaskList />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Dashboard;
