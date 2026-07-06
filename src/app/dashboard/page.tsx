"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";

export default function DashboardPage() {
  const router = useRouter();

  // Convex Hooks
  const settings = useQuery(api.settings.get);
  const experiences = useQuery(api.experience.list);
  const skillsList = useQuery(api.skills.list);
  const portfolioItemsDb = useQuery(api.portfolio.list);
  const testimonialsDb = useQuery(api.testimonials.list);
  const usersDb = useQuery(api.users.list);

  const updateSettings = useMutation(api.settings.update);
  const updateExperiences = useMutation(api.experience.updateAll);
  const updateSkills = useMutation(api.skills.updateAll);
  const addPortfolio = useMutation(api.portfolio.add);
  const updatePortfolio = useMutation(api.portfolio.update);
  const removePortfolio = useMutation(api.portfolio.remove);
  const addTestimonial = useMutation(api.testimonials.add);
  const updateTestimonial = useMutation(api.testimonials.update);
  const removeTestimonial = useMutation(api.testimonials.remove);
  const generateUploadUrl = useMutation(api.cv.generateUploadUrl);
  const addUser = useMutation(api.users.add);
  const updateUser = useMutation(api.users.update);
  const removeUser = useMutation(api.users.remove);

  const [isMounted, setIsMounted] = useState(false);
  const [isEditHomeOpen, setIsEditHomeOpen] = useState(false);
  const [isEditAboutOpen, setIsEditAboutOpen] = useState(false);
  const [isEditPortfolioOpen, setIsEditPortfolioOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemYoutubeUrl, setNewItemYoutubeUrl] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<"short films" | "3d animations" | "marketing">("short films");
  const [newItemYear, setNewItemYear] = useState("");
  const [newItemLength, setNewItemLength] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [showreelUrlInput, setShowreelUrlInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [biographyInput, setBiographyInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [cvUrlInput, setCvUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<Doc<"portfolio">[]>([]);
  const [isDeletePortfolioOpen, setIsDeletePortfolioOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Doc<"portfolio"> | null>(null);
  const [isUpdatePortfolioOpen, setIsUpdatePortfolioOpen] = useState(false);
  const [isUpdateItemOpen, setIsUpdateItemOpen] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<Doc<"portfolio"> | null>(null);
  const [updateItemTitle, setUpdateItemTitle] = useState("");
  const [updateItemCategory, setUpdateItemCategory] = useState<"short films" | "3d animations" | "marketing">("short films");
  const [updateItemYear, setUpdateItemYear] = useState("");
  const [updateItemLength, setUpdateItemLength] = useState("");

  // Testimonials CMS States
  const [isEditTestimonialsOpen, setIsEditTestimonialsOpen] = useState(false);
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false);
  const [isUpdateTestimonialsListOpen, setIsUpdateTestimonialsListOpen] = useState(false);
  const [isUpdateTestimonialDetailsOpen, setIsUpdateTestimonialDetailsOpen] = useState(false);
  const [isDeleteTestimonialsListOpen, setIsDeleteTestimonialsListOpen] = useState(false);
  const [isConfirmDeleteTestimonialOpen, setIsConfirmDeleteTestimonialOpen] = useState(false);

  const [testimonials, setTestimonials] = useState<Doc<"testimonials">[]>([]);
  const [testimonialQuoteInput, setTestimonialQuoteInput] = useState("");
  const [testimonialAuthorInput, setTestimonialAuthorInput] = useState(" ");
  const [testimonialTitleInput, setTestimonialTitleInput] = useState(" ");
  const [testimonialCompanyInput, setTestimonialCompanyInput] = useState(" ");
  
  const [deletingTestimonial, setDeletingTestimonial] = useState<Doc<"testimonials"> | null>(null);
  const [updatingTestimonial, setUpdatingTestimonial] = useState<Doc<"testimonials"> | null>(null);

  // Contact CMS States
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [contactSubtitleInput, setContactSubtitleInput] = useState("");
  const [contactEmailInput, setContactEmailInput] = useState("");
  const [contactLocationInput, setContactLocationInput] = useState("");

  // Social Media Icons CMS States
  const [isEditSocialOpen, setIsEditSocialOpen] = useState(false);
  const [socialInstagramInput, setSocialInstagramInput] = useState("");
  const [socialYoutubeInput, setSocialYoutubeInput] = useState("");
  const [socialTiktokInput, setSocialTiktokInput] = useState("");

  // User Management CMS States
  const [isEditUsersOpen, setIsEditUsersOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUsersListOpen, setIsUpdateUsersListOpen] = useState(false);
  const [isUpdateUserDetailsOpen, setIsUpdateUserDetailsOpen] = useState(false);
  const [isDeleteUsersListOpen, setIsDeleteUsersListOpen] = useState(false);
  const [isConfirmDeleteUserOpen, setIsConfirmDeleteUserOpen] = useState(false);

  const [usersList, setUsersList] = useState<Doc<"users">[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [updatingUser, setUpdatingUser] = useState<Doc<"users"> | null>(null);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const [deletingUser, setDeletingUser] = useState<Doc<"users"> | null>(null);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Synchronize state from Convex queries
  useEffect(() => {
    if (portfolioItemsDb) {
      setPortfolioItems(portfolioItemsDb);
    }
  }, [portfolioItemsDb]);

  useEffect(() => {
    if (testimonialsDb) {
      setTestimonials(testimonialsDb);
    }
  }, [testimonialsDb]);

  useEffect(() => {
    if (usersDb) {
      setUsersList(usersDb);
    }
  }, [usersDb]);

  useEffect(() => {
    if (isEditHomeOpen && settings) {
      setVideoUrlInput(settings.homeBgVideoUrl || "https://www.youtube.com/watch?v=BoUrWXaQUQQ");
      setShowreelUrlInput(settings.homeShowreelVideoUrl || "https://www.youtube.com/watch?v=BoUrWXaQUQQ");
      setYearInput(settings.copyrightYear || "2026");
    }
  }, [isEditHomeOpen, settings]);

  useEffect(() => {
    if (isEditAboutOpen && settings) {
      setBiographyInput(settings.aboutBiography || "");
      setCvUrlInput(settings.aboutCvUrl || "");
    }
    if (isEditAboutOpen && experiences) {
      const formatted = experiences.map((exp) => `${exp.company || ""} | ${exp.period || ""} | ${exp.role || ""}`).join("\n");
      setExperienceInput(formatted);
    }
    if (isEditAboutOpen && skillsList) {
      const formatted = skillsList.map((skill) => `${skill.category || ""} | ${skill.items || ""}`).join("\n");
      setSkillsInput(formatted);
    }
  }, [isEditAboutOpen, settings, experiences, skillsList]);

  useEffect(() => {
    if (isEditContactOpen && settings) {
      setContactSubtitleInput(settings.contactSubtitle || "Have a project in mind? Let’s create something extraordinary.");
      setContactEmailInput(settings.contactEmail || "studio@alexandraclarke.media");
      setContactLocationInput(settings.contactLocation || "Prague");
    }
  }, [isEditContactOpen, settings]);

  const handleSaveContact = async () => {
    if (!contactSubtitleInput.trim() || !contactEmailInput.trim() || !contactLocationInput.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await updateSettings({
        contactSubtitle: contactSubtitleInput.trim(),
        contactEmail: contactEmailInput.trim(),
        contactLocation: contactLocationInput.trim(),
      });
      setIsEditContactOpen(false);
    } catch {
      alert("Failed to save contact settings.");
    }
  };

  useEffect(() => {
    if (isEditSocialOpen && settings) {
      setSocialInstagramInput(settings.instagramUrl || "https://www.instagram.com/alexandra.lexi.clarke/");
      setSocialYoutubeInput(settings.youtubeUrl || "https://www.youtube.com/channel/UCrj_CL9J9GvSdUxoOE0Jzgg");
      setSocialTiktokInput(settings.tiktokUrl || "https://www.tiktok.com/@its.keeby.and.kirby");
    }
  }, [isEditSocialOpen, settings]);

  const handleSaveSocial = async () => {
    if (!socialInstagramInput.trim() || !socialYoutubeInput.trim() || !socialTiktokInput.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await updateSettings({
        instagramUrl: socialInstagramInput.trim(),
        youtubeUrl: socialYoutubeInput.trim(),
        tiktokUrl: socialTiktokInput.trim(),
      });
      setIsEditSocialOpen(false);
    } catch {
      alert("Failed to save social links.");
    }
  };

  const extractYouTubeId = (url: string): string => {
    if (!url) return "BoUrWXaQUQQ";
    if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
      return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "BoUrWXaQUQQ";
  };

  const getThumbnailUrl = (item: Doc<"portfolio">) => {
    if (item.videoUrl) {
      return `https://img.youtube.com/vi/${item.videoUrl}/hqdefault.jpg`;
    }
    return item.image || "/placeholder-thumbnail.webp";
  };

  const handleSave = async () => {
    try {
      const videoId = extractYouTubeId(videoUrlInput);
      const showreelId = extractYouTubeId(showreelUrlInput);
      await updateSettings({
        homeBgVideoUrl: videoUrlInput,
        homeBgVideoId: videoId,
        homeShowreelVideoUrl: showreelUrlInput,
        homeShowreelVideoId: showreelId,
        copyrightYear: yearInput,
      });
      setIsEditHomeOpen(false);
    } catch {
      alert("Failed to save home settings.");
    }
  };

  const handleSaveAbout = async () => {
    try {
      await updateSettings({
        aboutBiography: biographyInput,
        aboutCvUrl: cvUrlInput,
      });

      const lines = experienceInput.split("\n").filter(line => line.trim());
      const parsedExp = lines.map(line => {
        const parts = line.split("|");
        return {
          company: (parts[0] || "").trim(),
          period: (parts[1] || "").trim(),
          role: (parts[2] || "").trim()
        };
      });
      await updateExperiences({ items: parsedExp });

      const skillLines = skillsInput.split("\n").filter(line => line.trim());
      const parsedSkills = skillLines.map(line => {
        const parts = line.split("|");
        return {
          category: (parts[0] || "").trim(),
          items: (parts[1] || "").trim()
        };
      });
      await updateSkills({ items: parsedSkills });

      setIsEditAboutOpen(false);
    } catch {
      alert("Failed to save about settings.");
    }
  };

  const handleSavePortfolioItem = async () => {
    if (!newItemTitle.trim() || !newItemYoutubeUrl.trim() || !newItemYear.trim() || !newItemLength.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const videoId = extractYouTubeId(newItemYoutubeUrl);
      await addPortfolio({
        title: newItemTitle.trim(),
        category: newItemCategory,
        image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        year: newItemYear.trim(),
        length: newItemLength.trim(),
        videoUrl: videoId,
      });

      setNewItemTitle("");
      setNewItemYoutubeUrl("");
      setNewItemCategory("short films");
      setNewItemYear("");
      setNewItemLength("");
      setIsAddItemOpen(false);
    } catch {
      alert("Failed to add portfolio item.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingItem) {
      try {
        await removePortfolio({ id: deletingItem._id });
        setIsConfirmDeleteOpen(false);
        setDeletingItem(null);
      } catch {
        alert("Failed to delete portfolio item.");
      }
    }
  };

  const handleApplyUpdate = async () => {
    if (!updateItemTitle.trim() || !updateItemYear.trim() || !updateItemLength.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (updatingItem) {
      try {
        await updatePortfolio({
          id: updatingItem._id,
          title: updateItemTitle.trim(),
          category: updateItemCategory,
          year: updateItemYear.trim(),
          length: updateItemLength.trim(),
        });
        setIsUpdateItemOpen(false);
        setUpdatingItem(null);
        setUpdateItemTitle("");
        setUpdateItemYear("");
        setUpdateItemLength("");
      } catch {
        alert("Failed to update portfolio item.");
      }
    }
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialQuoteInput.trim() || !testimonialAuthorInput.trim() || !testimonialTitleInput.trim() || !testimonialCompanyInput.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addTestimonial({
        quote: testimonialQuoteInput.trim(),
        author: testimonialAuthorInput.trim(),
        title: `${testimonialTitleInput.trim()} • ${testimonialCompanyInput.trim()}`,
      });

      setTestimonialQuoteInput("");
      setTestimonialAuthorInput(" ");
      setTestimonialTitleInput(" ");
      setTestimonialCompanyInput(" ");
      setIsAddTestimonialOpen(false);
    } catch {
      alert("Failed to add testimonial.");
    }
  };

  const handleApplyTestimonialUpdate = async () => {
    if (!testimonialQuoteInput.trim() || !testimonialAuthorInput.trim() || !testimonialTitleInput.trim() || !testimonialCompanyInput.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (updatingTestimonial) {
      try {
        await updateTestimonial({
          id: updatingTestimonial._id,
          quote: testimonialQuoteInput.trim(),
          author: testimonialAuthorInput.trim(),
          title: `${testimonialTitleInput.trim()} • ${testimonialCompanyInput.trim()}`,
        });

        setTestimonialQuoteInput("");
        setTestimonialAuthorInput(" ");
        setTestimonialTitleInput(" ");
        setTestimonialCompanyInput(" ");
        setIsUpdateTestimonialDetailsOpen(false);
        setUpdatingTestimonial(null);
      } catch {
        alert("Failed to update testimonial.");
      }
    }
  };

  const handleDeleteTestimonialConfirm = async () => {
    if (deletingTestimonial) {
      try {
        await removeTestimonial({ id: deletingTestimonial._id });
        setIsConfirmDeleteTestimonialOpen(false);
        setDeletingTestimonial(null);
      } catch {
        alert("Failed to delete testimonial.");
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();
      const fileUrl = `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/api/storage/${storageId}`;
      setCvUrlInput(fileUrl);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong during file upload";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("lexi_cms_session");
      if (!session) {
        router.push("/lexilogin");
      }
    }
  }, [router]);

  const validatePasswordStrength = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long." };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase character." };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase character." };
    }
    if (!/\d/.test(password)) {
      return { isValid: false, message: "Password must contain at least one digit." };
    }
    if (!/[^A-Za-z0-9\s]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one symbol character (e.g., !, @, #, $, etc.)." };
    }
    return { isValid: true, message: "" };
  };

  const handleSaveUser = async () => {
    if (!newUsername.trim() || !newPassword.trim() || !newName.trim() || !newEmail.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const { isValid, message } = validatePasswordStrength(newPassword);
    if (!isValid) {
      setErrorMessage(message);
      setIsErrorModalOpen(true);
      return;
    }

    try {
      await addUser({
        username: newUsername.trim(),
        password: newPassword,
        name: newName.trim(),
        email: newEmail.trim(),
      });
      setNewUsername("");
      setNewPassword("");
      setNewName("");
      setNewEmail("");
      setShowNewPassword(false);
      setIsAddUserOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add user.";
      alert(msg);
    }
  };

  const handleApplyUserUpdate = async () => {
    if (!updateUsername.trim() || !updateName.trim() || !updateEmail.trim()) {
      alert("Username, Name, and Email are required.");
      return;
    }

    if (updatePassword) {
      const { isValid, message } = validatePasswordStrength(updatePassword);
      if (!isValid) {
        setErrorMessage(message);
        setIsErrorModalOpen(true);
        return;
      }
    }

    if (updatingUser) {
      try {
        await updateUser({
          id: updatingUser._id,
          username: updateUsername.trim(),
          password: updatePassword.trim() || undefined,
          name: updateName.trim(),
          email: updateEmail.trim(),
        });
        setUpdatingUser(null);
        setUpdateUsername("");
        setUpdatePassword("");
        setUpdateName("");
        setUpdateEmail("");
        setShowUpdatePassword(false);
        setIsUpdateUserDetailsOpen(false);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to update user.";
        alert(msg);
      }
    }
  };

  const handleDeleteUserConfirm = async () => {
    if (deletingUser) {
      try {
        await removeUser({ id: deletingUser._id });
        setIsConfirmDeleteUserOpen(false);
        setDeletingUser(null);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to delete user.";
        alert(msg);
      }
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("lexi_cms_session");
      localStorage.removeItem("lexi_cms_user");
    }
    router.push("/lexilogin");
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen w-screen bg-[#151515] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FBAB3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const panels = ["Home", "About", "Portfolio", "Testimonials", "Contact"];

  return (
    <div className="relative min-h-screen w-screen bg-[#151515] flex flex-col justify-center items-center py-8 md:py-12 px-4 overflow-y-auto select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#FBAB3C]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-[#FBAB3C]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Structured / Themed Background Pattern (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/textured-overlay.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Top Header - Same size as Home Panel - Positioned absolutely at the top on desktop */}
      <div className="relative md:absolute md:top-8 left-0 right-0 z-10 w-full flex flex-col items-center text-center mt-4 md:mt-0">
        <h1 className="font-editorial text-[43.4px] md:text-[85.8px] lg:text-[80.4px] font-bold tracking-tight stroked-title leading-none uppercase">
          ALEXANDRA CLARKE{" "}
          <span
            className="inline-block font-editorial text-[#FBAB3C]"
            style={{
              fontSize: "0.5em",
              WebkitTextFillColor: "#FBAB3C",
              WebkitTextStroke: "0px",
            }}
          >
            B.A.
          </span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="h-[1px] w-8 bg-[#FBAB3C]/40" />
          <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[4px] text-[#FBAB3C]">
            CMS PORTAL / DEV
          </span>
          <span className="h-[1px] w-8 bg-[#FBAB3C]/40" />
        </div>
      </div>

      {/* Dashboard Card Container - Same styling/sizing as login card */}
      <div className="relative z-10 w-full max-w-[660px] my-6 flex flex-col items-center">
        <div 
          className="w-full bg-[#151515]/65 backdrop-blur-md border border-[#FBAB3C]/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[360px] text-center"
          style={{ padding: "15px" }}
        >
          <div className="mb-6 flex flex-col items-center" style={{ marginBottom: "30px" }}>
            <h2 className="font-sans text-xl font-medium tracking-wider text-[#FBAB3C] uppercase mb-2">
              What do you want to do?
            </h2>
            <div className="h-[1px] w-24 bg-[#FBAB3C]/30" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }} />
          </div>

          <div className="flex flex-col gap-3 my-6" style={{ gap: "15px", marginTop: "30px", marginBottom: "30px" }}>
            {panels.map((panel) => (
              <a
                key={panel}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (panel === "Home") {
                    setIsEditHomeOpen(true);
                  } else if (panel === "About") {
                    setIsEditAboutOpen(true);
                  } else if (panel === "Portfolio") {
                    setIsEditPortfolioOpen(true);
                  } else if (panel === "Testimonials") {
                    setIsEditTestimonialsOpen(true);
                  } else if (panel === "Contact") {
                    setIsEditContactOpen(true);
                  }
                }}
                className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
              >
                <span>Edit {panel} Panel</span>
                <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsEditSocialOpen(true);
              }}
              className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
            >
              <span>Edit Social Media Icons</span>
              <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsEditUsersOpen(true);
              }}
              className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
            >
              <span>USER MANAGEMENT</span>
              <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* 25px Spacer between dashboard box and logout button */}
        <div style={{ height: "25px" }} />

        {/* Logout Button with rounded-[50px] border-radius and halved width, centered */}
        <button
          onClick={handleLogout}
          className="relative w-1/2 h-[58px] flex items-center justify-center bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-sm font-semibold uppercase tracking-[2px] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(251,171,60,0.25)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            Log Out <LogOut className="w-5 h-5" />
          </span>
        </button>
      </div>
      {/* Edit Home Panel Modal */}
      {isEditHomeOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "10px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "10px" }}
            >
              EDIT HOME PANEL
            </h3>
            
            <div>
              {/* Field 1 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Change the background video with another YouTube video
                </label>
                <input
                  type="text"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Field 2 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Change the showreel video with another YouTube video
                </label>
                <input
                  type="text"
                  value={showreelUrlInput}
                  onChange={(e) => setShowreelUrlInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Field 3 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Year
                </label>
                <input
                  type="text"
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="2026"
                />
              </div>
            </div>

            {/* Spacer 10px */}
            <div style={{ height: "10px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => setIsEditHomeOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit About Panel Modal */}
      {isEditAboutOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "10px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "10px" }}
            >
              EDIT ABOUT PANEL
            </h3>
            
            <div>
              {/* Biography Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Biography
                </label>
                <textarea
                  value={biographyInput}
                  onChange={(e) => setBiographyInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Biography text..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Edit Work Experience Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Work Experience
                </label>
                <textarea
                  value={experienceInput}
                  onChange={(e) => setExperienceInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Company Name | Period | Role"
                />
                <span className="block font-sans text-[9px] text-neutral-grey/60 mt-1 text-left uppercase tracking-wider">
                  Format: Company Name | Period | Role (one entry per line)
                </span>
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Edit Skills & Software Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Skills &amp; Software
                </label>
                <textarea
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Category Name | Skills & Tools"
                />
                <span className="block font-sans text-[9px] text-neutral-grey/60 mt-1 text-left uppercase tracking-wider">
                  Format: Category Name | Skills &amp; Tools (one entry per line)
                </span>
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* CV File Upload Field */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Upload New CV (PDF)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center justify-center border border-[#FBAB3C]/20 hover:border-[#FBAB3C] bg-[#1A1A1A] hover:bg-[#252525] text-[#FBAB3C] rounded px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap">
                    Choose File
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="font-sans text-xs text-neutral-grey truncate max-w-[250px]">
                    {isUploading ? "Uploading..." : cvUrlInput.replace(/^\//, "")}
                  </span>
                </div>
                {uploadError && (
                  <span className="block font-sans text-[10px] text-red-500 mt-1 text-left">
                    {uploadError}
                  </span>
                )}
              </div>
            </div>

            {/* Spacer 10px */}
            <div style={{ height: "10px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => setIsEditAboutOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAbout}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Portfolio Panel Modal */}
      {isEditPortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT PORTFOLIO
            </h3>
            
            <div className="flex flex-col gap-4" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setIsAddItemOpen(true)}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                ADD ITEM
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditPortfolioOpen(false);
                  setIsUpdatePortfolioOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                UPDATE ITEM
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditPortfolioOpen(false);
                  setIsDeletePortfolioOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                DELETE ITEM
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditPortfolioOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Portfolio Item Tertiary Modal */}
      {isAddItemOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              ADD PORTFOLIO ITEM
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Item Title
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter item title..."
                />
              </div>

              {/* Field 2: YouTube URL */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={newItemYoutubeUrl}
                  onChange={(e) => setNewItemYoutubeUrl(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Field 3: Category Dropdown */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as "short films" | "3d animations" | "marketing")}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors cursor-pointer"
                >
                  <option value="short films">SHORT FILM</option>
                  <option value="3d animations">3D ANIMATION</option>
                  <option value="marketing">MARKETING</option>
                </select>
              </div>

              {/* Field 4: Year */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Year
                </label>
                <input
                  type="text"
                  value={newItemYear}
                  onChange={(e) => setNewItemYear(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="e.g. 2024"
                />
              </div>

              {/* Field 5: Length */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Length
                </label>
                <input
                  type="text"
                  value={newItemLength}
                  onChange={(e) => setNewItemLength(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="e.g. 17:58"
                />
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsAddItemOpen(false);
                  // Reset fields
                  setNewItemTitle("");
                  setNewItemYoutubeUrl("");
                  setNewItemCategory("short films");
                  setNewItemYear("");
                  setNewItemLength("");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePortfolioItem}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Portfolio Item Panel */}
      {isDeletePortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              DELETE PORTFOLIO ITEM
            </h3>
            
            {/* Rows list, scrollable if there are many items */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {portfolioItems.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No portfolio items found.
                </div>
              ) : (
                portfolioItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-16 h-10 md:w-20 md:h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden border border-white/10">
                        <Image 
                          src={getThumbnailUrl(item)} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                          {item.title}
                        </span>
                        <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeletingItem(item);
                        setIsConfirmDeleteOpen(true);
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 hover:text-white rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeletePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && deletingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[450px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-center"
            style={{ padding: "25px" }}
          >
            <h4 
              className="font-sans text-sm font-bold tracking-widest text-[#FBAB3C] uppercase"
              style={{ marginBottom: "15px" }}
            >
              CONFIRM DELETION
            </h4>
            
            <p className="font-sans text-sm text-white/90 leading-relaxed mb-6">
              Are You Sure You Want To Delete {deletingItem.title}
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmDeleteOpen(false);
                  setIsDeletePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                  setDeletingItem(null);
                }}
                className="w-[100px] py-2.5 border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-[100px] py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Portfolio Item Panel */}
      {isUpdatePortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE PORTFOLIO ITEM
            </h3>
            
            {/* Rows list, scrollable if there are many items */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {portfolioItems.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No portfolio items found.
                </div>
              ) : (
                portfolioItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-16 h-10 md:w-20 md:h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden border border-white/10">
                        <Image 
                          src={getThumbnailUrl(item)} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                          {item.title}
                        </span>
                        <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUpdatingItem(item);
                        setUpdateItemTitle(item.title);
                        setUpdateItemCategory(item.category);
                        setUpdateItemYear(item.year || "");
                        setUpdateItemLength(item.length || "");
                        setIsUpdateItemOpen(true);
                      }}
                      className="px-4 py-2 border border-[#FBAB3C]/20 hover:border-[#FBAB3C] hover:bg-[#FBAB3C]/10 text-[#FBAB3C] rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      UPDATE
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Portfolio Item Details Tertiary Modal */}
      {isUpdateItemOpen && updatingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE ITEM DETAILS
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Item Title
                </label>
                <input
                  type="text"
                  value={updateItemTitle}
                  onChange={(e) => setUpdateItemTitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter item title..."
                />
              </div>

              {/* Field 2: Category Dropdown */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Category
                </label>
                <select
                  value={updateItemCategory}
                  onChange={(e) => setUpdateItemCategory(e.target.value as "short films" | "3d animations" | "marketing")}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors cursor-pointer"
                >
                  <option value="short films">SHORT FILM</option>
                  <option value="3d animations">3D ANIMATION</option>
                  <option value="marketing">MARKETING</option>
                </select>
              </div>

              {/* Field 3: Year */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Year
                </label>
                <input
                  type="text"
                  value={updateItemYear}
                  onChange={(e) => setUpdateItemYear(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="e.g. 2024"
                />
              </div>

              {/* Field 4: Length */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Length
                </label>
                <input
                  type="text"
                  value={updateItemLength}
                  onChange={(e) => setUpdateItemLength(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="e.g. 17:58"
                />
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsUpdateItemOpen(false);
                  setUpdatingItem(null);
                  setUpdateItemTitle("");
                  setUpdateItemCategory("short films");
                  setUpdateItemYear("");
                  setUpdateItemLength("");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyUpdate}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Testimonials Panel Modal */}
      {isEditTestimonialsOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT TESTIMONIALS
            </h3>
            
            <div className="flex flex-col gap-4" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => {
                  setTestimonialQuoteInput("");
                  setTestimonialAuthorInput(" ");
                  setTestimonialTitleInput(" ");
                  setTestimonialCompanyInput(" ");
                  setIsAddTestimonialOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                ADD TESTIMONIAL
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditTestimonialsOpen(false);
                  setIsUpdateTestimonialsListOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                UPDATE TESTIMONIAL
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditTestimonialsOpen(false);
                  setIsDeleteTestimonialsListOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                DELETE TESTIMONIAL
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditTestimonialsOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Testimonial Tertiary Modal */}
      {isAddTestimonialOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              ADD TESTIMONIAL
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Testimonial Text */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Testimonial Text
                </label>
                <textarea
                  value={testimonialQuoteInput}
                  onChange={(e) => setTestimonialQuoteInput(e.target.value)}
                  rows={5}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Enter testimonial text..."
                />
              </div>

              {/* Field 2: Author */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Author Name
                </label>
                <input
                  type="text"
                  value={testimonialAuthorInput}
                  onChange={(e) => setTestimonialAuthorInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 3: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={testimonialTitleInput}
                  onChange={(e) => setTestimonialTitleInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 4: Company */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Company
                </label>
                <input
                  type="text"
                  value={testimonialCompanyInput}
                  onChange={(e) => setTestimonialCompanyInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsAddTestimonialOpen(false);
                  setTestimonialQuoteInput("");
                  setTestimonialAuthorInput(" ");
                  setTestimonialTitleInput(" ");
                  setTestimonialCompanyInput(" ");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTestimonial}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Testimonial Panel */}
      {isDeleteTestimonialsListOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              DELETE TESTIMONIAL
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {testimonials.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No testimonials found.
                </div>
              ) : (
                testimonials.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                        &quot;{item.quote}&quot;
                      </span>
                      <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                        {item.author} &bull; {item.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeletingTestimonial(item);
                        setIsConfirmDeleteTestimonialOpen(true);
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 hover:text-white rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteTestimonialsListOpen(false);
                  setIsEditTestimonialsOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Testimonial Confirmation Modal */}
      {isConfirmDeleteTestimonialOpen && deletingTestimonial && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[450px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-center"
            style={{ padding: "25px" }}
          >
            <h4 
              className="font-sans text-sm font-bold tracking-widest text-[#FBAB3C] uppercase"
              style={{ marginBottom: "15px" }}
            >
              CONFIRM DELETION
            </h4>
            
            <p className="font-sans text-sm text-white/90 leading-relaxed mb-6">
              Are You Sure You Want To Delete Testimonial by {deletingTestimonial.author}?
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmDeleteTestimonialOpen(false);
                  setIsDeleteTestimonialsListOpen(false);
                  setIsEditTestimonialsOpen(true);
                  setDeletingTestimonial(null);
                }}
                className="w-[100px] py-2.5 border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDeleteTestimonialConfirm}
                className="w-[100px] py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Testimonials List Panel */}
      {isUpdateTestimonialsListOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE TESTIMONIAL
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {testimonials.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No testimonials found.
                </div>
              ) : (
                testimonials.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                        &quot;{item.quote}&quot;
                      </span>
                      <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                        {item.author} &bull; {item.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const parts = item.title.split(" • ");
                        const tTitle = parts[0] || "";
                        const tCompany = parts.slice(1).join(" • ") || "";

                        setUpdatingTestimonial(item);
                        setTestimonialQuoteInput(item.quote);
                        setTestimonialAuthorInput(item.author);
                        setTestimonialTitleInput(tTitle);
                        setTestimonialCompanyInput(tCompany);
                        setIsUpdateTestimonialDetailsOpen(true);
                      }}
                      className="px-4 py-2 border border-[#FBAB3C]/20 hover:border-[#FBAB3C] hover:bg-[#FBAB3C]/10 text-[#FBAB3C] rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      UPDATE
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsUpdateTestimonialsListOpen(false);
                  setIsEditTestimonialsOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Testimonial Details Tertiary Modal */}
      {isUpdateTestimonialDetailsOpen && updatingTestimonial && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE TESTIMONIAL DETAILS
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Testimonial Text */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Testimonial Text
                </label>
                <textarea
                  value={testimonialQuoteInput}
                  onChange={(e) => setTestimonialQuoteInput(e.target.value)}
                  rows={5}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Enter testimonial text..."
                />
              </div>

              {/* Field 2: Author */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Author Name
                </label>
                <input
                  type="text"
                  value={testimonialAuthorInput}
                  onChange={(e) => setTestimonialAuthorInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Gordon L. Schmitz"
                />
              </div>

              {/* Field 3: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={testimonialTitleInput}
                  onChange={(e) => setTestimonialTitleInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 4: Company */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Company
                </label>
                <input
                  type="text"
                  value={testimonialCompanyInput}
                  onChange={(e) => setTestimonialCompanyInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsUpdateTestimonialDetailsOpen(false);
                  setUpdatingTestimonial(null);
                  setTestimonialQuoteInput("");
                  setTestimonialAuthorInput(" ");
                  setTestimonialTitleInput(" ");
                  setTestimonialCompanyInput(" ");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyTestimonialUpdate}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Panel Modal */}
      {isEditContactOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT CONTACT
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Subtitle */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Subtitle
                </label>
                <textarea
                  value={contactSubtitleInput}
                  onChange={(e) => setContactSubtitleInput(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                />
              </div>

              {/* Direct Email */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Direct Email
                </label>
                <input
                  type="email"
                  value={contactEmailInput}
                  onChange={(e) => setContactEmailInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Location
                </label>
                <input
                  type="text"
                  value={contactLocationInput}
                  onChange={(e) => setContactLocationInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => setIsEditContactOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveContact}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Social Media Icons Modal */}
      {isEditSocialOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT SOCIAL MEDIA ICONS
            </h3>

            <div className="flex flex-col gap-4">
              {/* Instagram URL */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={socialInstagramInput}
                  onChange={(e) => setSocialInstagramInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors font-sans"
                />
              </div>

              {/* YouTube URL */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={socialYoutubeInput}
                  onChange={(e) => setSocialYoutubeInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors font-sans"
                />
              </div>

              {/* TikTok URL */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  TikTok URL
                </label>
                <input
                  type="text"
                  value={socialTiktokInput}
                  onChange={(e) => setSocialTiktokInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors font-sans"
                />
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => setIsEditSocialOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSocial}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Users Panel Modal */}
      {isEditUsersOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              USER MANAGEMENT
            </h3>
            
            <div className="flex flex-col gap-4" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => {
                  setNewUsername("");
                  setNewPassword("");
                  setNewName("");
                  setNewEmail("");
                  setIsAddUserOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                ADD USER
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditUsersOpen(false);
                  setIsUpdateUsersListOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                EDIT USER
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditUsersOpen(false);
                  setIsDeleteUsersListOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                DELETE USER
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditUsersOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Tertiary Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              ADD USER
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Name */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter full name..."
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter email address..."
                />
              </div>

              {/* Field 3: Username */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter username..."
                />
              </div>

              {/* Field 4: Password */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded pl-4 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                    placeholder="Enter password..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="font-sans text-[10px] text-neutral-grey/70 uppercase tracking-widest text-left" style={{ marginTop: "6px", lineHeight: "1.4" }}>
                  Must be at least 8 characters and contain: uppercase, lowercase, number, and symbol.
                </p>
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsAddUserOpen(false);
                  setNewUsername("");
                  setNewPassword("");
                  setNewName("");
                  setNewEmail("");
                  setShowNewPassword(false);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUser}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Users List Panel */}
      {isUpdateUsersListOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT USER
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {usersList.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No users found.
                </div>
              ) : (
                usersList.map((user) => (
                  <div 
                    key={user._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                        {user.name || "Unnamed"} ({user.username})
                      </span>
                      <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                        {user.email || "No Email"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUpdatingUser(user);
                        setUpdateUsername(user.username);
                        setUpdateName(user.name || "");
                        setUpdateEmail(user.email || "");
                        setUpdatePassword("");
                        setIsUpdateUserDetailsOpen(true);
                      }}
                      className="px-4 py-2 border border-[#FBAB3C]/20 hover:border-[#FBAB3C] hover:bg-[#FBAB3C]/10 text-[#FBAB3C] rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      UPDATE
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsUpdateUsersListOpen(false);
                  setIsEditUsersOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update User Details Tertiary Modal */}
      {isUpdateUserDetailsOpen && updatingUser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE USER DETAILS
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Name */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 3: Username */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                />
              </div>

              {/* Field 4: Password */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showUpdatePassword ? "text" : "password"}
                    value={updatePassword}
                    onChange={(e) => setUpdatePassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded pl-4 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors"
                    placeholder="Enter new password..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
                    aria-label={showUpdatePassword ? "Hide password" : "Show password"}
                  >
                    {showUpdatePassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="font-sans text-[10px] text-neutral-grey/70 uppercase tracking-widest text-left" style={{ marginTop: "6px", lineHeight: "1.4" }}>
                  Must be at least 8 characters and contain: uppercase, lowercase, number, and symbol.
                </p>
              </div>
            </div>

            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsUpdateUserDetailsOpen(false);
                  setUpdatingUser(null);
                  setUpdateUsername("");
                  setUpdatePassword("");
                  setUpdateName("");
                  setUpdateEmail("");
                  setShowUpdatePassword(false);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyUserUpdate}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Users List Panel */}
      {isDeleteUsersListOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              DELETE USER
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {usersList.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No users found.
                </div>
              ) : (
                usersList.map((user) => (
                  <div 
                    key={user._id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                        {user.name || "Unnamed"} ({user.username})
                      </span>
                      <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                        {user.email || "No Email"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeletingUser(user);
                        setIsConfirmDeleteUserOpen(true);
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 hover:text-white rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteUsersListOpen(false);
                  setIsEditUsersOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {isConfirmDeleteUserOpen && deletingUser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[450px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-center"
            style={{ padding: "25px" }}
          >
            <h4 
              className="font-sans text-sm font-bold tracking-widest text-[#FBAB3C] uppercase"
              style={{ marginBottom: "15px" }}
            >
              CONFIRM DELETION
            </h4>
            
            <p className="font-sans text-sm text-white/90 leading-relaxed mb-6">
              Are You Sure You Want To Delete user &quot;{deletingUser.username}&quot;?
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmDeleteUserOpen(false);
                  setIsDeleteUsersListOpen(false);
                  setIsEditUsersOpen(true);
                  setDeletingUser(null);
                }}
                className="w-[100px] py-2.5 border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDeleteUserConfirm}
                className="w-[100px] py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Policy Error Modal */}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[450px] bg-[#151515] border border-red-500/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-center"
            style={{ padding: "25px" }}
          >
            <h4 
              className="font-sans text-sm font-bold tracking-widest text-red-500 uppercase"
              style={{ marginBottom: "15px" }}
            >
              WEAK PASSWORD
            </h4>
            
            <p className="font-sans text-sm text-white/90 leading-relaxed mb-6">
              {errorMessage}
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsErrorModalOpen(false);
                  setErrorMessage("");
                }}
                className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
