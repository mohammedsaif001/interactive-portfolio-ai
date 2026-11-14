import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiGlobe, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ContactKind } from "@/lib/resume/contact";

export const contactIcons: Record<ContactKind, IconType> = {
  pin: FiMapPin,
  phone: FiPhone,
  mail: FiMail,
  linkedin: FaLinkedin,
  github: FaGithub,
  web: FiGlobe,
};
