import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Globe, Car, Languages } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CVSection = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Profile */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded-full" />
          Profile
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Ambitious and solution-oriented candidate with a solid background in IT and business. 
          I combine technical knowledge with strong collaboration and communication skills. 
          Experience from customer service, teaching, and technical IT consultancy roles has 
          provided me with a versatile toolkit. I am structured, curious, and goal-oriented, 
          passionate about learning new things and creating value in practice.
        </p>
      </motion.section>

      {/* Education */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-accent" />
          Education
        </h2>
        
        <div className="space-y-6">
          <div className="relative pl-6 border-l-2 border-accent/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
            <h3 className="font-semibold text-foreground">MSc in Software Design (Cand.it)</h3>
            <p className="text-sm text-accent mb-2">IT University of Copenhagen | 2025 – 2027</p>
            <p className="text-muted-foreground text-sm">
              Specialization in App and Web Development as well as Software Architecture.
            </p>
          </div>
          
          <div className="relative pl-6 border-l-2 border-accent/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent/60" />
            <h3 className="font-semibold text-foreground">BSc in Informatics and Business Studies</h3>
            <p className="text-sm text-accent mb-2">Roskilde University | 2021 – 2024</p>
            <p className="text-muted-foreground text-sm">
              Focus on programming, data analysis, UX design, and organizational learning.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent" />
          Relevant Experience
        </h2>
        
        <div className="space-y-6">
          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-foreground">Interpreter (Part-time)</h3>
              <span className="text-sm text-accent">2024 – Present</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 italic">Tolk Danmark</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Danish-English interpreting at municipal meetings with a focus on precision and ethics</li>
              <li>Facilitating communication for citizens in Copenhagen and surrounding areas</li>
              <li>Strong competencies in handling sensitive situations professionally</li>
            </ul>
          </div>
          
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-foreground">IT Consultant (Full-time)</h3>
              <span className="text-sm text-accent">2022 – 2023</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 italic">Danske Bank (via EY / M Networks)</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Try Hire engagement:</strong> Responsible for error correction in complex customer cases</li>
              <li>Analysis and processing of large data sets via advanced Excel solutions</li>
              <li>Ensured legal documentation and correct compensation for customers</li>
              <li>Responsible for training and onboarding new colleagues in the team</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Volunteering */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          Volunteering
        </h2>
        
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="font-semibold text-foreground">Homework Tutor / Mentor</h3>
            <span className="text-sm text-accent">2024 – Present</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2 italic">Save the Children Youth (Red Barnet Ungdom)</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Volunteer mentor for a boy in 5th grade</li>
            <li>Support academic learning and strengthen the student's motivation and self-confidence</li>
          </ul>
        </div>
      </motion.section>

      {/* Additional Info */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          Additional Information
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Languages className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm">Languages</h4>
              <p className="text-sm text-muted-foreground">
                Danish (Native), English (Fluent), German (Intermediate)
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm">Driving License</h4>
              <p className="text-sm text-muted-foreground">Category B (Passenger Car)</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default CVSection;
