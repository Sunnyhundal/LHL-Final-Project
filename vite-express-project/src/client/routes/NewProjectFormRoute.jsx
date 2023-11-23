import TypeSelectionBox from "../components/TypeSelectionBox";
import { useNewProject } from "../hooks/NewProjectContext";
import { useAuth } from "../hooks/AuthContext";

export default function NewProjectFormRoute() {
  const {
    imagePreview,
    setImagePreview,
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    handleProjectTypeForm,
    handleSubmit,
    selectedProject,
    setSelectedProject,
    filteredProjectType,
    projectTypeQuery,
    setProjectTypeQuery,
    handleLocationTypeForm,
    selectedLocation,
    setSelectedLocation,
    filteredLocationType,
    locationTypeQuery,
    setLocationTypeQuery,
  } = useNewProject();

  const handleProjectTypeSelect = (value) => {
    setSelectedProject(value);
    handleProjectTypeForm(value.name);
  };

  const handleLocationTypeSelect = (value) => {
    setSelectedLocation(value);
    handleLocationTypeForm(value.name);
  };

  const { user } = useAuth();
  const employer_id = user ? user.id : null;

  return (
    <div className="m-20">
      <form onSubmit={(e) => handleSubmit(e, employer_id)}>
        <div className="flex justify-center items-start">

        <div className="relative">
          <label className="border-solid border rounded-lg w-56 h-56 m-5 flex items-center justify-center text-white cursor-pointer relative">
            {!imagePreview && (
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileChange}
              />
            )}

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512" fill="#F27F3D">
                {/*<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
              </svg>
            )}
          </label>

          {imagePreview && (
            <button
              type="button"
              className="absolute top-1 right-1 text-pink-900"
              onClick={() => {
                setImagePreview(null);
                setFormData({
                  ...formData,
                  image: null,
                });
              }}
            >
              <span className="indicator-item badge badge-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </span> 
            </button>
          )}
        </div>

          <div className="flex flex-col items-center justify-center m-5 mt-0">
            <div className="form-control w-full max-w-xs m-3">
              <label className="label">
                  <span className="label-text">What's the name of your project?</span>
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  name="projectName"
                  className="input input-bordered text-sm w-full max-w-xs"
                  onChange={handleInputChange}
                  required
                />
            </div>
            <div className="form-control w-full max-w-xs m-3">
              <label className="label">
              <span className="label-text">Tell us about your project!</span>
              </label>
              <textarea
                placeholder="Description"
                name="description"
                className="textarea textarea-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <div className="form-control w-full max-w-xs m-3">
              <label className="label">
                <span className="label-text">What's your budget?</span>
                <span className="label-text-alt">CAD</span>
              </label>
              <input
              type="number"
              value={formData.budget}
              step="10"
              min="0"
              placeholder="Budget"
              name="budget"
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
              required/>
            </div>

            <div className="form-control w-full max-w-xs m-3">
              <label className="label">
              <span className="label-text">Where is it happening?</span>
              </label>
              <TypeSelectionBox
                onChange={handleLocationTypeForm}
                selectedType={selectedLocation}
                handleSelect={handleLocationTypeSelect}
                filteredType={filteredLocationType}
                query={locationTypeQuery}
                setQuery={setLocationTypeQuery} />
            </div>
            
            <div className="form-control w-full max-w-xs m-3">
              <label className="label">
              <span className="label-text">What kind of project?</span>
              </label>
              <TypeSelectionBox
                onChange={handleProjectTypeForm}
                selectedType={selectedProject}
                handleSelect={handleProjectTypeSelect}
                filteredType={filteredProjectType}
                query={projectTypeQuery}
                setQuery={setProjectTypeQuery} />
            </div>  
          </div>
        </div>
        <button
          className="font-subHeading bg-button hover:bg-buttonHover text-white font-bold py-2 px-4 max-w-xs m-3 rounded"
          type="submit"
        >
          Post Project
        </button>
      </form>
    </div>
  );
}