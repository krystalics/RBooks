package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.ChapterDao;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChapterDaoImpl implements ChapterDao {


  private ChapterRepository chapterRepository;

  @Autowired
  public ChapterDaoImpl(ChapterRepository chapterRepository) {
    this.chapterRepository = chapterRepository;
  }

  @Override
  public void addChapter(Chapter chapter) {
    chapterRepository.save(chapter);
  }

  @Override
  public void deleteChapter(ChapterId chapterId) { // 前端会传输过来，它的chapterId
    chapterRepository.deleteByChapterId(chapterId);
  }

  @Override
  public void updateChapter(Chapter chapter) {
    chapterRepository.save(chapter);
  }

  @Override
  public Chapter getChapter(ChapterId chapterId) {
    return chapterRepository.findByChapterId(chapterId);
  }
}
