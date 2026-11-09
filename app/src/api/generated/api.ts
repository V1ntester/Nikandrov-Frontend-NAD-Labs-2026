/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_create_smr_api_smrs_post */
export interface BodyCreateSmrApiSmrsPost {
  /** Name */
  name: string;
  /** Manufacturer */
  manufacturer: string;
  /** Image */
  image?: File | Blob | null;
  /** Video */
  video?: File | Blob | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** SmrLike */
export interface SmrLike {
  /** Action */
  action: number;
}

/** SmrListItem */
export interface SmrListItem {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Manufacturer */
  manufacturer: string;
  /** Image Url */
  image_url: string | null;
  /** Video Url */
  video_url: string | null;
  /** Description */
  description: string | null;
  /** Thermal Power */
  thermal_power: number | null;
  /** Electrical Power */
  electrical_power: number | null;
  /** Status */
  status: string;
  /** Creator Id */
  creator_id: number;
  /** Formed At */
  formed_at: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Is Owner
   * @default false
   */
  is_owner?: boolean;
  /**
   * Is Liked
   * @default false
   */
  is_liked?: boolean;
  /** Likes Count */
  likes_count: number;
}

/** SmrListResponse */
export interface SmrListResponse {
  /** Smrs */
  smrs: SmrListItem[];
}

/** SmrPublish */
export interface SmrPublish {
  /**
   * Description
   * @maxLength 500
   */
  description: string;
  /** Thermal Power */
  thermal_power: number;
  /** Electrical Power */
  electrical_power: number;
}

/** UserCreate */
export interface UserCreate {
  /**
   * Username
   * @maxLength 50
   */
  username: string;
  /**
   * Password
   * @maxLength 255
   */
  password: string;
}

/** UserLogin */
export interface UserLogin {
  /**
   * Username
   * @maxLength 50
   */
  username: string;
  /**
   * Password
   * @maxLength 255
   */
  password: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title SMR Catalog App
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags SMR
     * @name GetSmrsApiSmrsGet
     * @summary Получить список SMR с фильтрацией по цене
     * @request GET:/api/smrs
     */
    getSmrsApiSmrsGet: (
      query?: {
        /** Filter Min */
        filter_min?: number | null;
        /** Filter Max */
        filter_max?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<SmrListResponse, HTTPValidationError>({
        path: `/api/smrs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name CreateSmrApiSmrsPost
     * @summary Создать новый SMR с изображением и видео
     * @request POST:/api/smrs
     */
    createSmrApiSmrsPost: (
      data: BodyCreateSmrApiSmrsPost,
      params: RequestParams = {},
    ) =>
      this.request<SmrListItem, HTTPValidationError>({
        path: `/api/smrs`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name GetDraftApiSmrsDraftGet
     * @summary Получить черновик текущего пользователя
     * @request GET:/api/smrs/draft
     */
    getDraftApiSmrsDraftGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/smrs/draft`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name GetSmrApiSmrsSmrIdGet
     * @summary Получить SMR по ID
     * @request GET:/api/smrs/{smr_id}
     */
    getSmrApiSmrsSmrIdGet: (
      smrId: number,
      query?: {
        /**
         * Select Next
         * @default false
         */
        select_next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<SmrListItem, HTTPValidationError>({
        path: `/api/smrs/${smrId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name DeleteSmrApiSmrsSmrIdDelete
     * @summary Удалить SMR по ID
     * @request DELETE:/api/smrs/{smr_id}
     */
    deleteSmrApiSmrsSmrIdDelete: (smrId: number, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/smrs/${smrId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name PublishSmrApiSmrsDraftPublishPut
     * @summary Опубликовать черновик SMR
     * @request PUT:/api/smrs/draft/publish
     */
    publishSmrApiSmrsDraftPublishPut: (
      data: SmrPublish,
      params: RequestParams = {},
    ) =>
      this.request<SmrListItem, HTTPValidationError>({
        path: `/api/smrs/draft/publish`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SMR
     * @name LikeSmrApiSmrsSmrIdLikePost
     * @summary Поставить или убрать лайк SMR
     * @request POST:/api/smrs/{smr_id}/like
     */
    likeSmrApiSmrsSmrIdLikePost: (
      smrId: number,
      data: SmrLike,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/smrs/${smrId}/like`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name RegisterApiAuthRegisterPost
     * @summary Регистрация нового пользователя
     * @request POST:/api/auth/register
     */
    registerApiAuthRegisterPost: (
      data: UserCreate,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name LoginApiAuthLoginPost
     * @summary Авторизация пользователя
     * @request POST:/api/auth/login
     */
    loginApiAuthLoginPost: (data: UserLogin, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name LogoutApiAuthLogoutPost
     * @summary Выход из аккаунта
     * @request POST:/api/auth/logout
     */
    logoutApiAuthLogoutPost: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
}
