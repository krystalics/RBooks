package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.ChapterDao;
import com.example.rbooks.backend.entity.Chapter;
import com.example.rbooks.backend.entity.ChapterId;
import com.example.rbooks.backend.entity.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

  @Transactional //删除需要原子性，事务
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
