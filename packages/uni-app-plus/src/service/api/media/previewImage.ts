import {
  API_PREVIEW_IMAGE,
  API_TYPE_PREVIEW_IMAGE,
  defineAsyncApi,
  PreviewImageProtocol,
  PreviewImageOptions,
} from '@dcloudio/uni-api'

import { getRealPath } from '@dcloudio/uni-platform'

import { isPlainObject } from '@vue/shared'

import { initI18nChooseImageMsgsOnce, useI18n } from '@dcloudio/uni-core'

export const previewImage = <API_TYPE_PREVIEW_IMAGE>defineAsyncApi(
  API_PREVIEW_IMAGE,
  (
    { current = 0, indicator = 'number', loop = false, urls, longPressActions },
    { resolve, reject }
  ) => {
    initI18nChooseImageMsgsOnce()
    const { t } = useI18n()

    urls = urls.map((url) => getRealPath(url))

    const index = Number(current)
    if (isNaN(index)) {
      current = urls.indexOf(getRealPath(current as string))
      current = current < 0 ? 0 : current
    } else {
      current = index
    }

    plus.nativeUI.previewImage(urls, {
      current,
      indicator,
      loop,
      onLongPress: function (res: any) {
        let itemList = []
        let itemColor = ''

        const hasLongPressActions =
          longPressActions && isPlainObject(longPressActions)

        if (!hasLongPressActions) {
          itemList = [t('uni.previewImage.button.save')]
          itemColor = '#000000'
        } else {
          itemList = longPressActions!.itemList
            ? longPressActions!.itemList
            : []
          itemColor = longPressActions!.itemColor
            ? longPressActions!.itemColor
            : '#000000'
        }

        const options = {
          buttons: itemList.map((item) => ({
            title: item,
            color: itemColor,
          })),
          cancel: t('uni.previewImage.cancel'),
        }

        plus.nativeUI.actionSheet(options, (e) => {
          if (e.index > 0) {
            if (hasLongPressActions) {
              typeof longPressActions!.success === 'function' &&
                longPressActions!.success({
                  tapIndex: e.index - 1,
                  index: res.index,
                })

              return
            }
            plus.gallery.save(
              res.url,
              () => {
                plus.nativeUI.toast(t('uni.previewImage.save.success'))
              },
              function () {
                plus.nativeUI.toast(t('uni.previewImage.save.fail'))
              }
            )
          } else if (hasLongPressActions) {
            typeof longPressActions!.fail === 'function' &&
              longPressActions!.fail({
                errMsg: 'showActionSheet:fail cancel',
              })
          }
        })
      },
    })
    resolve()
  },
  PreviewImageProtocol,
  PreviewImageOptions
)
