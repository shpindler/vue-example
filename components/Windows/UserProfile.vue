<template>
  <window
    ref="window"
    :win="_window"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <vue-container :style="{ minWidth: '600px' }" fluid>
      <vue-row :class="$style.topRow" class="py-4 px-3">
        <vue-col cols="auto">
          <avatar :avatar="preview || profile.avatar" :size="106" class="mb-2" />
          <vue-btn :class="$style.loadPhotoBtn" @click="loadPhoto">
            Загрузить фото
          </vue-btn>
          <input
            ref="avatarInput"
            type="file"
            accept="image/jpeg,image/png"
            hidden
            @change="openCropper"
          >
        </vue-col>
        <vue-col cols="auto" class="pt-3">
          <div :class="$style.personName" class="mb-1">
            {{ fullName }}
          </div>
          <a
            href="`mailto:${profile.email}`"
            :class="$style.personEmail"
            class="d-block text-dark-gray"
          >
            {{ profile.email }}
          </a>
        </vue-col>
      </vue-row>
      <vue-row class="py-4">
        <vue-col>
          <vue-row class="mb-3">
            <vue-col>
              <last-name-field
                v-model="$v.form.lastName.$model"
                :state="getStateFor('lastName')"
                :error-message="getErrorMessageFor('lastName')"
              />
            </vue-col>
            <vue-col>
              <first-name-field
                v-model="$v.form.firstName.$model"
                :state="getStateFor('firstName')"
                :error-message="getErrorMessageFor('firstName')"
              />
            </vue-col>
            <vue-col>
              <patronymic-field
                v-model="$v.form.patronymic.$model"
                :state="getStateFor('patronymic')"
                :error-message="getErrorMessageFor('patronymic')"
              />
            </vue-col>
          </vue-row>
          <vue-row class="mb-3">
            <vue-col>
              <date-of-birth-field
                v-model="$v.form.dateOfBirth.$model"
                :state="getStateFor('dateOfBirth')"
                :error-message="getErrorMessageFor('dateOfBirth')"
                :disabled="!profile.isNewUser"
              />
            </vue-col>
            <vue-col>
              <phone-field
                v-model="$v.form.phone.$model"
                :state="getStateFor('phone')"
                :error-message="getErrorMessageFor('phone')"
              />
            </vue-col>
            <vue-col>
              <email-field
                v-model="$v.form.email.$model"
                :state="getStateFor('email')"
                :error-message="getErrorMessageFor('email')"
              />
            </vue-col>
          </vue-row>
          <vue-row>
            <vue-col>
              <position-field v-show="showPostAndUnit" :value="profile.position" disabled />
            </vue-col>
            <vue-col>
              <ucpk-field v-show="showPostAndUnit" :value="profile.ucpk" disabled />
            </vue-col>
          </vue-row>
        </vue-col>
      </vue-row>
    </vue-container>
    <template #footerButtons>
      <slot name="footerButtons">
        <vue-btn
          class="window-button ml-auto"
          @click="save"
        >
          Сохранить
        </vue-btn>
      </slot>
    </template>
  </window>
</template>

<script lang="ts">
import { Component, Prop, Ref, Inject, mixins } from 'nuxt-property-decorator'
import { Validate } from 'vuelidate-property-decorators'
import { email } from 'vuelidate-cyrillic-email-validator'
import EmailField from 'Fields/Email.vue'
import FirstNameField from 'Fields/FirstName.vue'
import PatronymicField from 'Fields/Patronymic.vue'
import LastNameField from 'Fields/LastName.vue'
import PositionField from 'Fields/Position.vue'
import UcpkField from 'Fields/Ucpk.vue'
import PhoneField from 'Fields/Phone.vue'
import DateOfBirthField from 'Fields/DateOfBirth.vue'
import { WindowProps, WindowsManager } from '@/types/windows'
import { UserProfile as UserProfileModel } from '@/business/user/models'
import FormMixin from '@/components/Forms/form'
import { userStore, rolesStore } from '@/utils/store-accessor'
import { UpdateUserData } from '@/business/user/types'

@Component({
  components: {
    FirstNameField,
    PatronymicField,
    LastNameField,
    PositionField,
    UcpkField,
    PhoneField,
    DateOfBirthField,
    EmailField,
  },
})
export default class UserProfile extends mixins(FormMixin) {
  @Inject() readonly windows!: WindowsManager

  @Prop({ default: () => ({}) }) readonly win!: WindowProps
  @Prop() readonly profile!: UserProfileModel
  @Prop({
    type: Boolean,
    default: () => {
      let name = rolesStore.role!.name
      if (name) {
        name = name.toLocaleLowerCase()
        return !(name === 'администратор цкадр' || name === 'администратор цптк')
      }
      return true
    },
  }) readonly showPostAndUnit!: boolean

  @Ref('avatarInput') readonly avatarInput!:
    HTMLInputElement & { files: FileList }

  @Validate({
    firstName: {
      isValid(value: string): boolean {
        return /^[а-яА-Я\s]+$/.test(value)
      },
    },
    lastName: {
      isValid(value: string): boolean {
        return /^[а-яА-Я\s]+$/.test(value)
      },
    },
    patronymic: {
      isValid(value: string): boolean {
        return /^[а-яА-Я\s]+$/.test(value)
      },
    },
    dateOfBirth: {
      isPast(value: Date): boolean {
        return value < new Date()
      },
    },
    phone: {
      isValid(value: string): boolean {
        return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
      },
    },
    email: {
      email,
    },
  })
  form: UpdateUserData = {
    avatar: undefined,
    firstName: this.profile.firstName,
    lastName: this.profile.lastName,
    patronymic: this.profile.patronymic,
    dateOfBirth: this.profile.dateOfBirth,
    phone: this.profile.phone,
    email: this.profile.email,
  }

  errors: Partial<UpdateUserData> = {}

  get _window(): WindowProps {
    return {
      ...new WindowProps({
        title: 'Личный кабинет',
        minimizable: true,
        maximizable: true,
        width: 800,
        height: 600,
      }),
      ...this.win,
    }
  }

  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName}`
  }

  get preview(): string {
    return this.form.avatar ? URL.createObjectURL(this.form.avatar) : ''
  }

  loadPhoto(): void {
    this.avatarInput.click()
  }

  openCropper(): void {
    this.$emit('update-props', { disabled: true })
    this.windows.open({
      component: import('Windows/Cropper.vue'),
      data: {
        props: {
          src: URL.createObjectURL(this.avatarInput.files[0]),
        },
      },
      listeners: {
        'update-image': (data: HTMLCanvasElement) => {
          data.toBlob((blob) => {
            this.form.avatar = blob || undefined
            this.avatarInput.value = ''
          })
        },
        close: () => {
          this.$emit('update-props', { disabled: false })
        },
      },
    })
  }

  save(): Promise<void> {
    return userStore.updateUser(this.form)
      .then(() => {
        this.$emit('close')
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          this.errors = error.response.data.errors
        }
      })
  }
}
</script>

<style lang="scss" module>
.topRow {
  border-bottom: 1px solid map_get($colors, gray)
}

.loadPhotoBtn {
  font-size: 10px;
  font-weight: normal;
  line-height: 2.2;
}

.personName {
  font-size: 24px;
}

.personEmail {
  font-size: 18px;
  text-decoration: none;
}
</style>
