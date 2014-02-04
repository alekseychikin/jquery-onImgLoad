onImgLoad
============

jQuery-плагин для определения состояния загрузки изображения.

Работает по следующей схеме.

```
$('img').onImgLoad(function (errors)
{
  // все изображения загрузились
  // errors — массив с картинками, которые по каким-то причинам не загрузились
});
```
Если надо выполнять какое-то событие на загрузку каждого изображения, то предусмотрено ещё одно событие.
$('img').onImgLoad({each: function (error)
  {
    // загрузилось изображение, если с ошибкой, то error будет не undefined
    // this — указатель на изображение
  },
  complete: function (errors)
  {
    // все изображения загрузились
    // errors — массив с картинками, которые по каким-то причинам не загрузились
  }
});
```
