export default function EditTaskPage() {
  return (
    <main className="container py-4">
      <div className="d-flex flex-column gap-4">
        <div>
          <h1 className="h4 mb-1">Edit Task</h1>
          <p className="text-body-secondary mb-0">
            Update details and keep the board in sync.
          </p>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <form className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Title</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Task title"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Describe the task"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select">
                  <option>Backlog</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Priority</label>
                <select className="form-select">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Assignee</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Add assignee"
                />
              </div>

              <div className="col-12 d-flex flex-column flex-sm-row gap-2 justify-content-end">
                <button type="button" className="btn btn-outline-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
