export default function EditTaskPage() {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingBlock: "2.5rem" }}
    >
      <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Edit Task</h5>
          <form className="d-flex flex-column gap-4">
            <div>
              <label htmlFor="title" className="form-label fw-semibold mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                className="form-control form-control-lg"
                placeholder="e.g. Design homepage"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="form-label fw-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Write details..."
                rows={5}
              />
              <div className="form-text mt-2">Optional, but recommended.</div>
            </div>

            <div>
              <label htmlFor="column" className="form-label fw-semibold">
                Column
              </label>
              <select id="column" name="column" className="form-select">
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
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
  );
}
