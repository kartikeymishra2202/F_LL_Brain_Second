import { useEffect, useState } from "react";

import { ContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/ui/Sidebar";
import { ShareIcon } from "../icons/shareIcon";
import { PlusIcon } from "../icons/plusIcon";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const [modalopen, setModalOpen] = useState(false);
  //
  const { content, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalopen, refresh]);
  // console.log("Content in Dashboard:", content);
  // console.log("Type of content:", typeof content);
  // console.log("Is content an array?", Array.isArray(content));
  return (
    <>
      {" "}
      <div className="grid grid-cols-[10%_90%]">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row">
          <div>
            {/* <!-- Stats Grid --> */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              id="el-fibh1d4t"
            >
              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                id="el-rr4gz53f"
              >
                <div className="flex items-center" id="el-o375lxq9">
                  <div
                    className="p-2 bg-indigo-100 rounded-lg"
                    id="el-fmr8zyew"
                  >
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="el-ady54dqg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        id="el-014soq3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4" id="el-fqwxi6on">
                    <h2
                      className="text-sm font-medium text-gray-600"
                      id="el-3v6s5a9t"
                    >
                      Skills Analyzed
                    </h2>
                    <p
                      className="text-lg font-semibold text-gray-800"
                      id="el-8b14yqus"
                    >
                      24
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                id="el-88l058lf"
              >
                <div className="flex items-center" id="el-bq790b1e">
                  <div className="p-2 bg-green-100 rounded-lg" id="el-zb1ou8uo">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="el-uaxljpge"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        id="el-mff1yrww"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4" id="el-nmv6pkro">
                    <h2
                      className="text-sm font-medium text-gray-600"
                      id="el-wrilb2b7"
                    >
                      Skill Progress
                    </h2>
                    <p
                      className="text-lg font-semibold text-gray-800"
                      id="el-s99mvigf"
                    >
                      68%
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                id="el-mr2k5sid"
              >
                <div className="flex items-center" id="el-n6kv61cf">
                  <div
                    className="p-2 bg-yellow-100 rounded-lg"
                    id="el-j42b0zwn"
                  >
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="el-ztl1zuop"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        id="el-uu3s75li"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4" id="el-70len20k">
                    <h2
                      className="text-sm font-medium text-gray-600"
                      id="el-cx0f24wf"
                    >
                      Courses Complete
                    </h2>
                    <p
                      className="text-lg font-semibold text-gray-800"
                      id="el-0vzyuwwy"
                    >
                      12
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                id="el-yljiktfb"
              >
                <div className="flex items-center" id="el-q9mupwhn">
                  <div
                    className="p-2 bg-purple-100 rounded-lg"
                    id="el-wu1gr2j2"
                  >
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="el-9reooicb"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        id="el-nee6rcdd"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4" id="el-u1w02jfh">
                    <h2
                      className="text-sm font-medium text-gray-600"
                      id="el-zqrn7s3y"
                    >
                      Career Matches
                    </h2>
                    <p
                      className="text-lg font-semibold text-gray-800"
                      id="el-0kqrk3rb"
                    >
                      8
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 max-w-100 min-h-screen bg-gray-100  border-2">
              <ContentModal
                open={modalopen}
                onClose={() => setModalOpen(!modalopen)}
              />
              <div className="flex gap-4 justify-end">
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  varient={"primary"}
                  size={"sm"}
                  text="ADD Content"
                  startIcon={<PlusIcon />}
                />
                <Button
                  onClick={() => {
                    alert("Share your Brain With Your Friends");
                  }}
                  varient={"secondary"}
                  size={"sm"}
                  text="Share Brain"
                  startIcon={<ShareIcon />}
                />
              </div>
              <div className="flex p-2 m-1">
                <div className="p-2 m-1 gap-2 flex flex-wrap">
                  {content?.map(({ type, link, title, contentId }) => (
                    <Card
                      type={type}
                      link={link}
                      title={title}
                      contentId={contentId}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
