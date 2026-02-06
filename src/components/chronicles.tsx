"use client";

import { ArrowLeft, BookOpen, Calendar, Tag } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { RpgWindow } from "@/components/rpg-window";
import type { Chronicle } from "@/types/portfolio";

type ChroniclesProps = {
  posts: Chronicle[];
};

export function Chronicles({ posts }: ChroniclesProps) {
  const [selectedPost, setSelectedPost] = useState<Chronicle | null>(null);

  if (selectedPost) {
    return (
      <RpgWindow title={`CHRONICLE #${selectedPost.id.toString().padStart(3, "0")}`}>
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 bg-[#45475a] text-[#cdd6f4] px-4 py-2 text-[10px] border-2 border-[#45475a] hover:border-[#f9e2af] hover:bg-[#313244] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            ▸ BACK TO CHRONICLES
          </button>

          <div className="bg-[#181825] border-4 border-[#45475a] p-6">
            <h1 className="text-[#f9e2af] text-base mb-4">{selectedPost.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#bac2de] mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(selectedPost.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span>•</span>
              <span>{selectedPost.readTime} read</span>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-3 h-3 text-[#f9e2af]" />
              <div className="flex flex-wrap gap-1">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#45475a] text-[8px] border border-[#45475a] text-[#bac2de]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#181825] border-4 border-[#45475a] p-6">
            <article className="prose prose-invert prose-sm max-w-none markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedPost.content}</ReactMarkdown>
            </article>
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 bg-[#45475a] text-[#cdd6f4] px-4 py-2 text-[10px] border-2 border-[#45475a] hover:border-[#f9e2af] hover:bg-[#313244] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            ▸ BACK TO CHRONICLES
          </button>
        </div>
      </RpgWindow>
    );
  }

  return (
    <RpgWindow title="CHRONICLES (BLOG)">
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[#181825] border-4 border-[#45475a] p-4 md:p-6 hover:border-[#f9e2af] transition-all cursor-pointer group"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#f9e2af] mt-1 group-hover:animate-pulse flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#f9e2af] mb-2 text-xs group-hover:text-[#f5c2e7] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] text-[#bac2de] mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#cdd6f4] mb-4 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-start gap-2 mb-4">
              <Tag className="w-3 h-3 text-[#f9e2af] mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#45475a] text-[8px] border border-[#45475a] text-[#bac2de]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#45475a]">
              <button className="w-full sm:w-auto bg-[#45475a] text-[#cdd6f4] px-4 py-2 text-[10px] border-2 border-[#45475a] hover:bg-[#f9e2af] hover:text-[#1e1e2e] hover:border-[#f9e2af] transition-all">
                ▸ READ CHRONICLE
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 bg-[#181825] border-2 border-[#45475a] p-6 text-center">
        <BookOpen className="w-8 h-8 text-[#45475a] mx-auto mb-3" />
        <p className="text-[10px] text-[#bac2de] leading-relaxed">
          ▸ More chronicles are being written... Check back soon for new entries! ▸
        </p>
      </div>
    </RpgWindow>
  );
}
